import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materialThickness, setMaterialThickness] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const products = [
    { id: 1, name: 'Биметаллическое полотно M42', category: 'saw-blades', type: 'Биметалл', width: '27мм', thickness: '0.9мм', tooth: '4/6 TPI', material: 'Металл, сталь', image: '🔩' },
    { id: 2, name: 'Биметаллическое полотно M51', category: 'saw-blades', type: 'Биметалл', width: '34мм', thickness: '1.1мм', tooth: '3/4 TPI', material: 'Нержавейка, титан', image: '⚙️' },
    { id: 3, name: 'Твердосплавное полотно TCT', category: 'saw-blades', type: 'Твердосплав', width: '27мм', thickness: '0.9мм', tooth: '2/3 TPI', material: 'Композиты, пластик', image: '💎' },
    { id: 4, name: 'Углеродистое полотно Carbon', category: 'saw-blades', type: 'Углеродистая сталь', width: '20мм', thickness: '0.65мм', tooth: '6/10 TPI', material: 'Дерево, мягкие металлы', image: '🪵' },
    { id: 5, name: 'Заточка дисковых пил', category: 'sharpening', description: 'Профессиональная заточка дисковых пил любого диаметра', price: 'от 300₽', image: '⚡' },
    { id: 6, name: 'Заточка ленточных пил', category: 'sharpening', description: 'Высокоточная заточка ленточных пил на станках CBN', price: 'от 250₽', image: '✨' },
    { id: 7, name: 'Стол швейный промышленный', category: 'tables', size: '1200x600мм', description: 'Усиленная конструкция, регулировка высоты', price: '15 000₽', image: '🪑' },
    { id: 8, name: 'Стол швейный угловой', category: 'tables', size: '1400x800мм', description: 'Увеличенная рабочая поверхность, L-форма', price: '22 000₽', image: '📐' },
  ];

  const calculateRecommendation = () => {
    if (!selectedMaterial || !materialThickness || !equipmentType) return;

    const thickness = parseFloat(materialThickness);
    let result: any = {
      bladeType: '',
      width: '',
      thickness: '',
      tooth: '',
      speed: '',
      tips: []
    };

    if (selectedMaterial === 'steel') {
      if (thickness <= 50) {
        result = {
          bladeType: 'Биметаллическое полотно M42',
          width: '27мм',
          thickness: '0.9мм',
          tooth: '4/6 TPI',
          speed: '60-80 м/мин',
          tips: ['Используйте СОЖ для охлаждения', 'Контролируйте натяжение полотна', 'Оптимально для стали до 50мм']
        };
      } else {
        result = {
          bladeType: 'Биметаллическое полотно M51',
          width: '34мм',
          thickness: '1.1мм',
          tooth: '3/4 TPI',
          speed: '50-70 м/мин',
          tips: ['Требуется усиленное охлаждение', 'Снизьте скорость для толстых заготовок', 'Идеально для стали 50-200мм']
        };
      }
    } else if (selectedMaterial === 'stainless') {
      result = {
        bladeType: 'Биметаллическое полотно M51',
        width: '34мм',
        thickness: '1.1мм',
        tooth: '3/4 TPI',
        speed: '40-60 м/мин',
        tips: ['Обязательно используйте СОЖ', 'Нержавейка требует меньшей скорости', 'Следите за износом зубьев']
      };
    } else if (selectedMaterial === 'wood') {
      result = {
        bladeType: 'Углеродистое полотно Carbon',
        width: '20мм',
        thickness: '0.65мм',
        tooth: '6/10 TPI',
        speed: '800-1000 м/мин',
        tips: ['Высокая скорость для чистого реза', 'Не требуется охлаждение', 'Подходит для всех пород дерева']
      };
    } else if (selectedMaterial === 'plastic') {
      result = {
        bladeType: 'Твердосплавное полотно TCT',
        width: '27мм',
        thickness: '0.9мм',
        tooth: '2/3 TPI',
        speed: '100-150 м/мин',
        tips: ['Избегайте перегрева материала', 'Подходит для композитов', 'Долгий срок службы полотна']
      };
    }

    setRecommendation(result);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚙️</div>
              <div>
                <h1 className="text-xl font-bold">ООО ПКФ "Технология"</h1>
                <p className="text-xs text-slate-300">Производство пильных полотен</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'about', 'products', 'services', 'calculator', 'gallery', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-sky-400 transition-colors ${activeSection === section ? 'text-sky-400' : ''}`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О компании'}
                  {section === 'products' && 'Продукция'}
                  {section === 'services' && 'Услуги'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Главная секция */}
      <section id="home" className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold leading-tight">
                Производство пильных полотен<br />
                <span className="text-sky-400">для ленточных пил</span>
              </h2>
              <p className="text-xl text-slate-300">
                Профессиональное оборудование, заточка инструмента и производство швейных столов с 1995 года
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600" onClick={() => scrollToSection('products')}>
                  <Icon name="Package" size={20} className="mr-2" />
                  Каталог продукции
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900" onClick={() => scrollToSection('calculator')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Подбор полотна
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🏭</div>
                  <CardTitle className="text-white">28+ лет</CardTitle>
                  <CardDescription className="text-slate-300">на рынке</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">⚡</div>
                  <CardTitle className="text-white">5000+</CardTitle>
                  <CardDescription className="text-slate-300">довольных клиентов</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🔧</div>
                  <CardTitle className="text-white">500+</CardTitle>
                  <CardDescription className="text-slate-300">видов продукции</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">✨</div>
                  <CardTitle className="text-white">100%</CardTitle>
                  <CardDescription className="text-slate-300">гарантия качества</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-sky-500 text-white">О компании</Badge>
            <h3 className="text-4xl font-bold">ООО ПКФ "Технология"</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Мы специализируемся на производстве высококачественных пильных полотен для ленточных пил, 
              предоставляем услуги по заточке режущего инструмента и изготавливаем профессиональные швейные столы. 
              За 28 лет работы мы зарекомендовали себя как надёжный партнёр для промышленных предприятий по всей России.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Award" size={40} className="text-sky-500 mb-4" />
                  <CardTitle>Качество</CardTitle>
                  <CardDescription>Сертифицированная продукция по ГОСТ</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Zap" size={40} className="text-orange-500 mb-4" />
                  <CardTitle>Скорость</CardTitle>
                  <CardDescription>Быстрая обработка заказов</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Users" size={40} className="text-green-500 mb-4" />
                  <CardTitle>Поддержка</CardTitle>
                  <CardDescription>Консультации специалистов</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Продукция с фильтрацией */}
      <section id="products" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-sky-500 text-white mb-4">Продукция</Badge>
            <h3 className="text-4xl font-bold mb-4">Наш каталог</h3>
            <p className="text-lg text-slate-600">Широкий ассортимент продукции для любых задач</p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Всё</TabsTrigger>
              <TabsTrigger value="saw-blades">Пильные полотна</TabsTrigger>
              <TabsTrigger value="sharpening">Заточка</TabsTrigger>
              <TabsTrigger value="tables">Швейные столы</TabsTrigger>
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover-scale hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">{product.image}</div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {product.type && <Badge variant="outline">{product.type}</Badge>}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {product.width && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Ширина:</span>
                        <span className="font-semibold">{product.width}</span>
                      </div>
                    )}
                    {product.thickness && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Толщина:</span>
                        <span className="font-semibold">{product.thickness}</span>
                      </div>
                    )}
                    {product.tooth && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Шаг зуба:</span>
                        <span className="font-semibold">{product.tooth}</span>
                      </div>
                    )}
                    {product.material && (
                      <div className="text-sm">
                        <span className="text-slate-600">Для:</span>
                        <p className="font-semibold">{product.material}</p>
                      </div>
                    )}
                    {product.description && (
                      <p className="text-sm text-slate-600">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="text-lg font-bold text-sky-600">{product.price}</p>
                    )}
                    {product.size && (
                      <p className="text-sm text-slate-600">Размер: {product.size}</p>
                    )}
                    <Button className="w-full mt-4 bg-sky-500 hover:bg-sky-600">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Калькулятор подбора */}
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-orange-500 text-white mb-4">Калькулятор</Badge>
              <h3 className="text-4xl font-bold mb-4">Подбор пильного полотна</h3>
              <p className="text-lg text-slate-600">Выберите параметры для расчёта оптимального полотна</p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} className="text-sky-500" />
                  Интерактивный калькулятор
                </CardTitle>
                <CardDescription>Заполните все поля для получения рекомендации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="material">Материал для резки</Label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger id="material">
                        <SelectValue placeholder="Выберите материал" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="steel">Сталь конструкционная</SelectItem>
                        <SelectItem value="stainless">Нержавеющая сталь</SelectItem>
                        <SelectItem value="wood">Древесина</SelectItem>
                        <SelectItem value="plastic">Пластик / композиты</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thickness">Толщина материала (мм)</Label>
                    <Input
                      id="thickness"
                      type="number"
                      placeholder="Введите толщину"
                      value={materialThickness}
                      onChange={(e) => setMaterialThickness(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipment">Тип оборудования</Label>
                    <Select value={equipmentType} onValueChange={setEquipmentType}>
                      <SelectTrigger id="equipment">
                        <SelectValue placeholder="Выберите станок" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="horizontal">Горизонтальный ленточнопильный</SelectItem>
                        <SelectItem value="vertical">Вертикальный ленточнопильный</SelectItem>
                        <SelectItem value="universal">Универсальный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  className="w-full bg-sky-500 hover:bg-sky-600" 
                  size="lg"
                  onClick={calculateRecommendation}
                  disabled={!selectedMaterial || !materialThickness || !equipmentType}
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Подобрать полотно
                </Button>

                {recommendation && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg border-2 border-sky-200 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="CheckCircle2" size={24} className="text-green-500" />
                      <h4 className="text-xl font-bold">Рекомендация готова!</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Рекомендуемое полотно</p>
                        <p className="text-2xl font-bold text-sky-600">{recommendation.bladeType}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-slate-600">Ширина</p>
                          <p className="text-lg font-semibold">{recommendation.width}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-slate-600">Толщина</p>
                          <p className="text-lg font-semibold">{recommendation.thickness}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-slate-600">Шаг зуба</p>
                          <p className="text-lg font-semibold">{recommendation.tooth}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-slate-600">Скорость резки</p>
                          <p className="text-lg font-semibold">{recommendation.speed}</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Lightbulb" size={18} className="text-orange-500" />
                          Рекомендации по эксплуатации:
                        </p>
                        <ul className="space-y-1">
                          {recommendation.tips.map((tip: string, index: number) => (
                            <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                              <span className="text-sky-500 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-green-500 hover:bg-green-600" size="lg">
                        <Icon name="Phone" size={18} className="mr-2" />
                        Заказать консультацию специалиста
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-green-500 text-white mb-4">Услуги</Badge>
            <h3 className="text-4xl font-bold mb-4">Что мы предлагаем</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardHeader>
                <div className="text-5xl mb-4">🔪</div>
                <CardTitle>Заточка инструмента</CardTitle>
                <CardDescription>Профессиональная заточка режущего инструмента на современном оборудовании</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <div className="text-5xl mb-4">⚙️</div>
                <CardTitle>Производство полотен</CardTitle>
                <CardDescription>Изготовление пильных полотен под заказ любых размеров</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <div className="text-5xl mb-4">🪑</div>
                <CardTitle>Швейные столы</CardTitle>
                <CardDescription>Производство профессиональных столов для швейного производства</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-purple-500 text-white mb-4">Галерея</Badge>
            <h3 className="text-4xl font-bold mb-4">Наше производство</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1,2,3,4,5,6].map(i => (
              <Card key={i} className="hover-scale overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl">
                  {['🏭','⚙️','🔧','💎','✨','🔩'][i-1]}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-white text-slate-900 mb-4">Контакты</Badge>
            <h3 className="text-4xl font-bold mb-4">Свяжитесь с нами</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader className="text-center">
                <Icon name="Phone" size={40} className="mx-auto mb-4 text-sky-400" />
                <CardTitle className="text-white">Телефон</CardTitle>
                <CardDescription className="text-slate-300">+7 (XXX) XXX-XX-XX</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader className="text-center">
                <Icon name="Mail" size={40} className="mx-auto mb-4 text-sky-400" />
                <CardTitle className="text-white">Email</CardTitle>
                <CardDescription className="text-slate-300">info@tehnologiya.ru</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader className="text-center">
                <Icon name="MapPin" size={40} className="mx-auto mb-4 text-sky-400" />
                <CardTitle className="text-white">Адрес</CardTitle>
                <CardDescription className="text-slate-300">г. Москва, ул. Промышленная, 1</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 ООО ПКФ "Технология". Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
