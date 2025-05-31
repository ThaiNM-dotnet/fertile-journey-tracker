
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Bell, Calendar, CreditCard, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return <Calendar className="h-4 w-4 text-blue-600" />;
    case 'payment':
      return <CreditCard className="h-4 w-4 text-green-600" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Info className="h-4 w-4 text-blue-600" />;
  }
};

export const NotificationList = () => {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Đang tải thông báo...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Chưa có thông báo nào</p>
      </div>
    );
  }

  return (
    <div className="max-h-96">
      <div className="p-3 border-b flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {notifications.filter(n => !n.is_read).length} thông báo chưa đọc
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          className="text-xs"
        >
          Đánh dấu tất cả đã đọc
        </Button>
      </div>
      
      <ScrollArea className="max-h-80">
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                !notification.is_read && "bg-blue-50"
              )}
              onClick={() => !notification.is_read && markAsRead(notification.id)}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className={cn(
                      "text-sm font-medium text-gray-900",
                      !notification.is_read && "font-semibold"
                    )}>
                      {notification.title}
                    </h4>
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDistanceToNow(new Date(notification.created_at), {
                      addSuffix: true,
                      locale: vi
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
