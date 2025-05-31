
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Stethoscope, Calendar, Award, PhoneCall, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-600" />
              <h1 className="text-2xl font-bold text-gray-800">FertilityCare</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-pink-600 transition-colors">Trang chủ</Link>
              <Link to="/services" className="text-gray-600 hover:text-pink-600 transition-colors">Dịch vụ</Link>
              <Link to="/doctors" className="text-gray-600 hover:text-pink-600 transition-colors">Bác sĩ</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-pink-600 transition-colors">Dashboard</Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button variant="outline" onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/auth")} className="bg-pink-600 hover:bg-pink-700">
                  <User className="w-4 h-4 mr-2" />
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Chăm sóc sức khỏe sinh sản
            <span className="block text-pink-600">Với tình yêu thương</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chúng tôi đồng hành cùng bạn trên hành trình tìm kiếm hạnh phúc làm cha mẹ với các phương pháp điều trị hiếm muộn tiên tiến nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700" onClick={() => navigate("/consultation")}>
              Tư vấn miễn phí
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/booking")}>
              <PhoneCall className="w-4 h-4 mr-2" />
              Đặt lịch hẹn
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Dịch vụ điều trị hiếm muộn
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-600">
                  <Heart className="w-6 h-6 mr-2" />
                  IUI - Thụ tinh trong tử cung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Phương pháp đưa tinh trùng đã được xử lý trực tiếp vào tử cung để tăng khả năng thụ thai tự nhiên.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-600">
                  <Stethoscope className="w-6 h-6 mr-2" />
                  IVF - Thụ tinh trong ống nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Kỹ thuật thụ tinh ngoài cơ thể, sau đó chuyển phôi về tử cung với tỷ lệ thành công cao.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-600">
                  <Users className="w-6 h-6 mr-2" />
                  Tư vấn chuyên sâu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Đội ngũ bác sĩ chuyên khoa sinh sản tư vấn và đưa ra phương án điều trị phù hợp nhất.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-pink-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Tại sao chọn chúng tôi?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Đội ngũ chuyên gia</h4>
              <p className="text-gray-600">Bác sĩ giàu kinh nghiệm với trình độ chuyên môn cao</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Công nghệ tiên tiến</h4>
              <p className="text-gray-600">Trang thiết bị y tế hiện đại và kỹ thuật mới nhất</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Theo dõi liên tục</h4>
              <p className="text-gray-600">Hệ thống quản lý và nhắc nhở lịch trình chi tiết</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Chăm sóc tận tâm</h4>
              <p className="text-gray-600">Đồng hành và hỗ trợ suốt quá trình điều trị</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Bắt đầu hành trình của bạn ngay hôm nay
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Liên hệ với chúng tôi để được tư vấn miễn phí và lập kế hoạch điều trị phù hợp
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100" onClick={() => navigate("/booking")}>
            Đặt lịch tư vấn ngay
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-400" />
                <h4 className="text-xl font-bold">FertilityCare</h4>
              </div>
              <p className="text-gray-400">
                Trung tâm điều trị hiếm muộn hàng đầu với đội ngũ chuyên gia giàu kinh nghiệm.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Dịch vụ</h5>
              <ul className="space-y-2 text-gray-400">
                <li>IUI - Thụ tinh trong tử cung</li>
                <li>IVF - Thụ tinh trong ống nghiệm</li>
                <li>Tư vấn sinh sản</li>
                <li>Xét nghiệm chuyên khoa</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Liên hệ</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📞 1900 1234</li>
                <li>📧 info@fertilitycare.vn</li>
                <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Giờ làm việc</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Thứ 2 - Thứ 6: 8:00 - 17:00</li>
                <li>Thứ 7: 8:00 - 12:00</li>
                <li>Chủ nhật: Nghỉ</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
