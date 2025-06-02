
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Stethoscope, Calendar, Award, PhoneCall, User, LogOut, Clock, Shield, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, userRole, signOut } = useAuth();
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
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Trang chủ</Link>
              <Link to="/services" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Dịch vụ</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Về chúng tôi</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Liên hệ</Link>
            </nav>
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {userRole === 'manager' && (
                    <Button variant="outline" onClick={() => navigate("/manager")} className="border-pink-200 text-pink-600 hover:bg-pink-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Quản lý
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => navigate("/profile")} className="border-pink-200 text-pink-600 hover:bg-pink-50">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut} className="text-gray-600 hover:text-pink-600">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/auth")} className="border-pink-200 text-pink-600 hover:bg-pink-50">
                    Đăng nhập
                  </Button>
                  <Button onClick={() => navigate("/auth")} className="bg-pink-600 hover:bg-pink-700 text-white">
                    Đăng ký ngay
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Chăm sóc sức khỏe sinh sản
            <br />
            <span className="text-pink-600">Với tình yêu thương</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi đồng hành cùng bạn trên hành trình tìm kiếm hạnh phúc. Đem 
            đến những dịch vụ chăm sóc sức khỏe sinh sản tốt nhất dành cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full" onClick={() => navigate("/consultation")}>
              Tư vấn ngay
            </Button>
            <Button size="lg" variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full" onClick={() => navigate("/booking")}>
              Tìm hiểu thêm
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md text-center p-6">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800 text-xl">IUI - Thụ tinh trong tử cung</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Phương pháp hỗ trợ sinh sản đơn giản và hiệu quả, 
                  giúp tăng khả năng thụ thai tự nhiên.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md text-center p-6">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800 text-xl">IVF - Thụ tinh trong ống nghiệm</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Công nghệ tiên tiến nhất trong hỗ trợ sinh sản, 
                  mang lại hy vọng cho các cặp vợ chồng hiếm muộn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md text-center p-6">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800 text-xl">Tư vấn chuyên sâu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Đội ngũ bác sĩ giàu kinh nghiệm tư vấn và đồng 
                  hành cùng bạn trong hành trình làm cha mẹ.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-pink-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Tại sao chọn chúng tôi?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Đội ngũ chuyên gia</h4>
              <p className="text-gray-600 leading-relaxed">Bác sĩ giàu kinh nghiệm với trình độ chuyên môn cao</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Công nghệ hiện đại</h4>
              <p className="text-gray-600 leading-relaxed">Trang thiết bị y tế hiện đại và kỹ thuật mới nhất</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Tỷ lệ thành công cao</h4>
              <p className="text-gray-600 leading-relaxed">Hệ thống quản lý và nhắc nhở lịch trình chi tiết</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Chăm sóc tận tâm</h4>
              <p className="text-gray-600 leading-relaxed">Đồng hành và hỗ trợ suốt quá trình điều trị</p>
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
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn miễn phí và lập kế hoạch điều trị phù hợp
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full" onClick={() => navigate("/booking")}>
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
              <p className="text-gray-400 leading-relaxed">
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
