import { useEffect, useState } from 'react';
import { digitalContentService } from '../../api/services';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LoadingSpinner } from '../../components/common';
import { Lock, FileText } from 'lucide-react';

export const DigitalContentPage = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await digitalContentService.getContent();
        setContent(data.content);
      } catch (err: any) {
        // If error is 403, it means no subscription
        if (err.response?.status === 403) {
          setError('You need an active subscription to view this content.');
        } else {
          setError('Failed to load content.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto bg-red-100 p-3 rounded-full mb-4 w-fit">
              <Lock className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{error}</p>
            <a href="/pricing" className="text-primary hover:underline">
              Upgrade your plan
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Premium Content</CardTitle>
              <p className="text-sm text-gray-500">Exclusive access for subscribers</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-800">
              {content}
            </p>
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
              <span className="font-semibold">Note:</span> This content is only visible because you have an active subscription.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};