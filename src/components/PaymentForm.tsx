
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CreditCard, Loader2 } from 'lucide-react';
import { useServicePrices } from '@/hooks/useServicePrices';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentFormProps {
  appointmentId?: string;
  onPaymentSuccess?: () => void;
}

export const PaymentForm = ({ appointmentId, onPaymentSuccess }: PaymentFormProps) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { services, formatPrice } = useServicePrices();
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!user || !selectedService) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn dịch vụ và đăng nhập",
        variant: "destructive"
      });
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    setLoading(true);

    try {
      // Tạo payment record trước
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          appointment_id: appointmentId,
          amount: service.price,
          currency: service.currency,
          payment_status: 'pending'
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // TODO: Tích hợp Stripe checkout session
      // Hiện tại chỉ mô phỏng thanh toán thành công
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Cập nhật trạng thái thanh toán
      await supabase
        .from('payments')
        .update({ 
          payment_status: 'completed',
          transaction_id: `mock_${Date.now()}`,
          payment_method: 'stripe'
        })
        .eq('id', payment.id);

      // Tạo notification thành công
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: 'Thanh toán thành công',
          message: `Bạn đã thanh toán thành công cho dịch vụ ${service.service_name}`,
          type: 'payment',
          data: {
            payment_id: payment.id,
            service_name: service.service_name,
            amount: service.price
          }
        });

      toast({
        title: "Thanh toán thành công",
        description: `Đã thanh toán ${formatPrice(service.price, service.currency)} cho ${service.service_name}`
      });

      onPaymentSuccess?.();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Lỗi thanh toán",
        description: "Không thể xử lý thanh toán. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Thanh toán dịch vụ
        </CardTitle>
        <CardDescription>
          Chọn dịch vụ và tiến hành thanh toán
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service">Chọn dịch vụ</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn dịch vụ cần thanh toán" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{service.service_name}</span>
                    <span className="ml-2 font-semibold">
                      {formatPrice(service.price, service.currency)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedService && (
          <div className="bg-gray-50 p-4 rounded-lg">
            {(() => {
              const service = services.find(s => s.id === selectedService);
              return service ? (
                <div>
                  <h4 className="font-medium">{service.service_name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  <p className="text-lg font-bold text-pink-600 mt-2">
                    {formatPrice(service.price, service.currency)}
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        )}

        <Button 
          onClick={handlePayment} 
          disabled={!selectedService || loading}
          className="w-full bg-pink-600 hover:bg-pink-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            'Thanh toán ngay'
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          * Hiện tại đang sử dụng hệ thống thanh toán mô phỏng. 
          Tích hợp Stripe thực tế cần cấu hình Stripe Secret Key.
        </p>
      </CardContent>
    </Card>
  );
};
