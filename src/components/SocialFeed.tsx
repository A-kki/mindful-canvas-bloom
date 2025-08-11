import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Clock, Send } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

interface VentPost {
  id: string;
  content: string;
  created_at: string;
  is_anonymous: boolean;
  user_id: string;
  like_count?: number;
  comment_count?: number;
  user_has_liked?: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  is_anonymous: boolean;
  user_id: string;
}

const SocialFeed = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<VentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [postId: string]: string }>({});
  const [loadingComments, setLoadingComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      fetchPosts();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('vent_posts')
        .select(`
          *,
          vent_post_likes!left(user_id),
          vent_post_comments!left(id)
        `)
        .eq('is_anonymous', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const postsWithCounts = (data || []).map(post => ({
        ...post,
        like_count: post.vent_post_likes?.length || 0,
        comment_count: post.vent_post_comments?.length || 0,
        user_has_liked: user ? post.vent_post_likes?.some((like: any) => like.user_id === user.id) : false,
      }));
      
      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('social-feed-posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'vent_posts',
          filter: 'is_anonymous=eq.true'
        },
        (payload) => {
          const newPost = payload.new as VentPost;
          setPosts(prev => [newPost, ...prev]);
          toast({
            title: "New anonymous post! 💬",
            description: "Someone just shared their thoughts...",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.user_has_liked) {
        // Unlike
        await supabase
          .from('vent_post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          like_count: (p.like_count || 0) - 1,
          user_has_liked: false
        } : p));
      } else {
        // Like
        await supabase
          .from('vent_post_likes')
          .insert({ post_id: postId, user_id: user.id });
        
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          like_count: (p.like_count || 0) + 1,
          user_has_liked: true
        } : p));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchComments = async (postId: string) => {
    if (loadingComments.has(postId)) return;
    
    setLoadingComments(prev => new Set([...prev, postId]));
    
    try {
      const { data, error } = await supabase
        .from('vent_post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(prev => ({ ...prev, [postId]: data || [] }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
        if (!comments[postId]) {
          fetchComments(postId);
        }
      }
      return newSet;
    });
  };

  const handleComment = async (postId: string) => {
    if (!user || !newComment[postId]?.trim()) return;

    try {
      const { data, error } = await supabase
        .from('vent_post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: newComment[postId].trim(),
          is_anonymous: true
        })
        .select()
        .single();

      if (error) throw error;

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data]
      }));
      
      setPosts(prev => prev.map(p => p.id === postId ? {
        ...p,
        comment_count: (p.comment_count || 0) + 1
      } : p));

      setNewComment(prev => ({ ...prev, [postId]: '' }));
      
      toast({
        title: "Comment added! 💬",
        description: "Your anonymous comment has been shared.",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-white/90 to-purple-100/90 dark:from-slate-800/90 dark:to-blue-950/90 border-purple-200/50 dark:border-slate-700/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-5xl animate-bounce">💬</div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Community Stories 🌈
              </h1>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/50 dark:bg-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white/90 to-purple-100/90 dark:from-slate-800/90 dark:to-blue-950/90 border-purple-200/50 dark:border-slate-700/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-5xl animate-bounce">💬</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Community Stories 🌈
            </h1>
          </div>

          <div className="bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-slate-700/50 dark:to-blue-800/50 rounded-3xl p-6 mb-8 border-2 border-dashed border-blue-300/50 dark:border-slate-600/50">
            <p className="text-lg text-gray-700 dark:text-gray-200 text-center font-medium">
              ✨ A safe space where friends share their thoughts anonymously ✨
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Share your own story in VentSpace with "Share anonymously" checked!
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No stories yet...
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Be the first to share an anonymous story in VentSpace!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-white/80 dark:bg-slate-700/80 border-purple-200/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-blue-400 dark:to-indigo-500 rounded-full flex items-center justify-center text-xl">
                        🤗
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-purple-600 dark:text-blue-300">Anonymous Friend</span>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            {formatTimeAgo(post.created_at)}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-slate-600/50 dark:to-blue-700/50 rounded-2xl p-4 mb-4">
                          <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLike(post.id)}
                            className={`transition-colors ${
                              post.user_has_liked 
                                ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' 
                                : 'text-purple-600 dark:text-blue-300 hover:bg-purple-100 dark:hover:bg-blue-900/30'
                            }`}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${post.user_has_liked ? 'fill-current' : ''}`} />
                            {post.like_count || 0}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleComments(post.id)}
                            className="text-purple-600 dark:text-blue-300 hover:bg-purple-100 dark:hover:bg-blue-900/30"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comment_count || 0}
                          </Button>
                        </div>

                        {/* Comments Section */}
                        {expandedComments.has(post.id) && (
                          <div className="mt-4 space-y-3">
                            {loadingComments.has(post.id) ? (
                              <div className="space-y-2">
                                {[1, 2].map(i => (
                                  <Skeleton key={i} className="h-12 w-full" />
                                ))}
                              </div>
                            ) : (
                              <>
                                {comments[post.id]?.map((comment) => (
                                  <div key={comment.id} className="bg-gray-50 dark:bg-slate-600/30 rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-xs">
                                        🗨️
                                      </div>
                                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Anonymous
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatTimeAgo(comment.created_at)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                                      {comment.content}
                                    </p>
                                  </div>
                                ))}
                                
                                {/* Add Comment Form */}
                                {user && (
                                  <div className="flex gap-2 pt-2">
                                    <Input
                                      placeholder="Add an anonymous comment..."
                                      value={newComment[post.id] || ''}
                                      onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                                      className="flex-1"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => handleComment(post.id)}
                                      disabled={!newComment[post.id]?.trim()}
                                      className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                      <Send className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialFeed;