
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ServicePrice {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  description: string;
  is_active: boolean;
}

export const useServicePrices = () => {
  const [services, setServices] = useState<ServicePrice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('service_prices')
      .select('*')
      .eq('is_active', true)
      .order('price');

    if (error) {
      console.error('Error fetching service prices:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const formatPrice = (price: number, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency === 'VND' ? 'VND' : 'USD',
    }).format(price);
  };

  return {
    services,
    loading,
    formatPrice,
    refetch: fetchServices
  };
};
