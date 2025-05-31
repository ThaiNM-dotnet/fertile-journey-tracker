import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Baby } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NotificationBell } from "@/components/NotificationBell";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IVF Care Center - Trang chủ";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-pink-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-pink-600 mr-3" />
              <span className="text-xl font-bold text-gray-800">IVF Care Center</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <NotificationBell />
                  <span className="text-gray-600">Xin chào, {user.email}</span>
                  <Button onClick={signOut} variant="outline">
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/auth")} className="bg-pink-600 hover:bg-pink-700">
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Chào mừng đến với IVF Care Center
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe sinh sản tốt nhất
          </p>
          <Button onClick={() => navigate("/booking")} className="bg-pink-600 hover:bg-pink-700">
            Đặt lịch hẹn ngay
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dịch vụ của chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ chăm sóc sức khỏe sinh sản toàn diện
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Tư vấn chuyên khoa",
                description: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn và hỗ trợ",
                price: "500,000đ"
              },
              {
                icon: Heart,
                title: "IUI - Thụ tinh nhân tạo",
                description: "Phương pháp hỗ trợ sinh sản hiệu quả và an toàn",
                price: "15,000,000đ"
              },
              {
                icon: Baby,
                title: "IVF - Thụ tinh trong ống nghiệm",
                description: "Công nghệ hiện đại giúp hiện thực hóa ước mơ làm cha mẹ",
                price: "80,000,000đ"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-pink-600 mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-pink-600">{service.price}</p>
                    <Button 
                      size="sm" 
                      onClick={() => navigate("/payment")}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      Thanh toán
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi tự hào là trung tâm hàng đầu về chăm sóc sức khỏe sinh sản
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Đội ngũ chuyên gia",
                description: "Các bác sĩ và chuyên gia hàng đầu trong lĩnh vực",
              },
              {
                title: "Công nghệ tiên tiến",
                description: "Sử dụng các phương pháp và thiết bị hiện đại nhất",
              },
              {
                title: "Chăm sóc tận tâm",
                description: "Luôn lắng nghe và đồng hành cùng bạn trên hành trình",
              },
              {
                title: "Tỷ lệ thành công cao",
                description: "Đạt được tỷ lệ thành công hàng đầu trong khu vực",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t border-pink-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            &copy; 2024 IVF Care Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
