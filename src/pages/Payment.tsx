
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PaymentForm } from '@/components/PaymentForm';

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointment_id');

  const handlePaymentSuccess = () => {
    navigate('/profile', { 
      state: { message: 'Thanh toán thành công!' } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Thanh toán</h1>
        </div>

        <PaymentForm 
          appointmentId={appointmentId || undefined}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default Payment;
