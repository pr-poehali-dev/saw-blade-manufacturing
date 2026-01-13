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
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 metal-texture border-b-2 border-primary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-2xl font-bold text-background border-2 border-background/50">
                Т
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-wide uppercase">ПКФ "Технология"</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Industrial Solutions</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'about', 'products', 'services', 'calculator', 'gallery', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm uppercase tracking-wider font-semibold hover:text-primary transition-colors ${activeSection === section ? 'text-primary' : 'text-foreground/70'}`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
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
        <div className="h-1 warning-stripes"></div>
      </nav>

      {/* Главная секция */}
      <section id="home" className="py-24 relative industrial-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <Badge className="bg-primary text-background text-xs uppercase tracking-wider px-4 py-2 font-bold">
                  С 1995 года
                </Badge>
              </div>
              <h2 className="text-6xl font-bold leading-tight uppercase">
                Производство<br />
                <span className="text-primary">пильных полотен</span>
              </h2>
              <div className="h-1 w-32 bg-primary"></div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Профессиональное промышленное оборудование, заточка инструмента высокой точности и производство швейных столов
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-wider" onClick={() => scrollToSection('products')}>
                  <Icon name="Package" size={20} className="mr-2" />
                  Каталог
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-background font-bold uppercase tracking-wider" onClick={() => scrollToSection('calculator')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Подбор
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="steel-plate rivet-border hover-scale">
                <CardHeader>
                  <div className="text-5xl mb-3">🏭</div>
                  <CardTitle className="text-3xl font-bold text-primary">28+</CardTitle>
                  <CardDescription className="text-muted-foreground uppercase text-xs tracking-wider">лет опыта</CardDescription>
                </CardHeader>
              </Card>
              <Card className="steel-plate rivet-border hover-scale">
                <CardHeader>
                  <div className="text-5xl mb-3">⚡</div>
                  <CardTitle className="text-3xl font-bold text-primary">5000+</CardTitle>
                  <CardDescription className="text-muted-foreground uppercase text-xs tracking-wider">клиентов</CardDescription>
                </CardHeader>
              </Card>
              <Card className="steel-plate rivet-border hover-scale">
                <CardHeader>
                  <div className="text-5xl mb-3">🔧</div>
                  <CardTitle className="text-3xl font-bold text-primary">500+</CardTitle>
                  <CardDescription className="text-muted-foreground uppercase text-xs tracking-wider">изделий</CardDescription>
                </CardHeader>
              </Card>
              <Card className="steel-plate rivet-border hover-scale">
                <CardHeader>
                  <div className="text-5xl mb-3">✨</div>
                  <CardTitle className="text-3xl font-bold text-primary">100%</CardTitle>
                  <CardDescription className="text-muted-foreground uppercase text-xs tracking-wider">качество</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Производство</Badge>
              <h3 className="text-5xl font-bold uppercase">ПКФ "Технология"</h3>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Специализируемся на производстве высококачественных пильных полотен для ленточных пил, 
              предоставляем услуги по заточке режущего инструмента и изготавливаем профессиональные швейные столы. 
              За 28 лет работы мы зарекомендовали себя как надёжный партнёр для промышленных предприятий.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="steel-plate rivet-border hover-scale text-center">
                <CardHeader>
                  <Icon name="Award" size={48} className="text-primary mb-4 mx-auto" />
                  <CardTitle className="uppercase text-lg tracking-wider">Качество</CardTitle>
                  <CardDescription className="text-muted-foreground">Сертификация ГОСТ</CardDescription>
                </CardHeader>
              </Card>
              <Card className="steel-plate rivet-border hover-scale text-center">
                <CardHeader>
                  <Icon name="Zap" size={48} className="text-primary mb-4 mx-auto" />
                  <CardTitle className="uppercase text-lg tracking-wider">Скорость</CardTitle>
                  <CardDescription className="text-muted-foreground">Быстрая обработка</CardDescription>
                </CardHeader>
              </Card>
              <Card className="steel-plate rivet-border hover-scale text-center">
                <CardHeader>
                  <Icon name="Users" size={48} className="text-primary mb-4 mx-auto" />
                  <CardTitle className="uppercase text-lg tracking-wider">Поддержка</CardTitle>
                  <CardDescription className="text-muted-foreground">Консультации 24/7</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Продукция с фильтрацией */}
      <section id="products" className="py-24 industrial-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Каталог</Badge>
            <h3 className="text-5xl font-bold uppercase">Продукция</h3>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
            <p className="text-lg text-muted-foreground">Широкий ассортимент промышленного оборудования</p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto bg-card border-2 border-primary/30">
              <TabsTrigger value="all" className="uppercase tracking-wider font-bold data-[state=active]:bg-primary data-[state=active]:text-background py-3">Всё</TabsTrigger>
              <TabsTrigger value="saw-blades" className="uppercase tracking-wider font-bold data-[state=active]:bg-primary data-[state=active]:text-background py-3">Полотна</TabsTrigger>
              <TabsTrigger value="sharpening" className="uppercase tracking-wider font-bold data-[state=active]:bg-primary data-[state=active]:text-background py-3">Заточка</TabsTrigger>
              <TabsTrigger value="tables" className="uppercase tracking-wider font-bold data-[state=active]:bg-primary data-[state=active]:text-background py-3">Столы</TabsTrigger>
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="steel-plate rivet-border hover-scale hover:shadow-2xl transition-all">
                  <CardHeader>
                    <div className="text-7xl text-center mb-4 grayscale opacity-80">{product.image}</div>
                    <CardTitle className="text-base uppercase tracking-wide">{product.name}</CardTitle>
                    {product.type && <Badge variant="outline" className="border-primary text-primary uppercase text-xs">{product.type}</Badge>}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {product.width && (
                      <div className="flex justify-between text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground uppercase text-xs">Ширина:</span>
                        <span className="font-bold text-primary">{product.width}</span>
                      </div>
                    )}
                    {product.thickness && (
                      <div className="flex justify-between text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground uppercase text-xs">Толщина:</span>
                        <span className="font-bold text-primary">{product.thickness}</span>
                      </div>
                    )}
                    {product.tooth && (
                      <div className="flex justify-between text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground uppercase text-xs">Шаг зуба:</span>
                        <span className="font-bold text-primary">{product.tooth}</span>
                      </div>
                    )}
                    {product.material && (
                      <div className="text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground uppercase text-xs block mb-1">Для:</span>
                        <p className="font-semibold text-foreground">{product.material}</p>
                      </div>
                    )}
                    {product.description && (
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="text-xl font-bold text-primary">{product.price}</p>
                    )}
                    {product.size && (
                      <p className="text-sm text-muted-foreground uppercase text-xs">Размер: {product.size}</p>
                    )}
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-wider">
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
      <section id="calculator" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Калькулятор</Badge>
              <h3 className="text-5xl font-bold uppercase">Подбор полотна</h3>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground">Автоматический расчёт оптимальных параметров</p>
            </div>

            <Card className="steel-plate rivet-border shadow-2xl">
              <CardHeader className="border-b-2 border-primary/30">
                <CardTitle className="flex items-center gap-3 uppercase tracking-wider">
                  <Icon name="Calculator" size={28} className="text-primary" />
                  Параметры подбора
                </CardTitle>
                <CardDescription className="text-muted-foreground">Заполните все поля для получения рекомендации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="material" className="uppercase text-xs tracking-wider font-bold text-muted-foreground">Материал для резки</Label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger id="material" className="border-2 border-primary/30 h-12">
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

                  <div className="space-y-3">
                    <Label htmlFor="thickness" className="uppercase text-xs tracking-wider font-bold text-muted-foreground">Толщина материала (мм)</Label>
                    <Input
                      id="thickness"
                      type="number"
                      placeholder="Введите толщину"
                      value={materialThickness}
                      onChange={(e) => setMaterialThickness(e.target.value)}
                      className="border-2 border-primary/30 h-12"
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="equipment" className="uppercase text-xs tracking-wider font-bold text-muted-foreground">Тип оборудования</Label>
                    <Select value={equipmentType} onValueChange={setEquipmentType}>
                      <SelectTrigger id="equipment" className="border-2 border-primary/30 h-12">
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
                  className="w-full bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-wider h-14 text-lg" 
                  onClick={calculateRecommendation}
                  disabled={!selectedMaterial || !materialThickness || !equipmentType}
                >
                  <Icon name="Sparkles" size={22} className="mr-2" />
                  Рассчитать параметры
                </Button>

                {recommendation && (
                  <div className="mt-8 p-8 bg-background/50 rounded border-2 border-primary animate-fade-in">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary/30">
                      <Icon name="CheckCircle2" size={28} className="text-primary" />
                      <h4 className="text-2xl font-bold uppercase tracking-wider">Результат расчёта</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-card p-6 rounded border-2 border-primary/30">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Рекомендуемое полотно</p>
                        <p className="text-3xl font-bold text-primary uppercase">{recommendation.bladeType}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card p-4 rounded border-2 border-primary/30 text-center">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Ширина</p>
                          <p className="text-xl font-bold text-primary">{recommendation.width}</p>
                        </div>
                        <div className="bg-card p-4 rounded border-2 border-primary/30 text-center">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Толщина</p>
                          <p className="text-xl font-bold text-primary">{recommendation.thickness}</p>
                        </div>
                        <div className="bg-card p-4 rounded border-2 border-primary/30 text-center">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Шаг зуба</p>
                          <p className="text-xl font-bold text-primary">{recommendation.tooth}</p>
                        </div>
                        <div className="bg-card p-4 rounded border-2 border-primary/30 text-center">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Скорость</p>
                          <p className="text-xl font-bold text-primary">{recommendation.speed}</p>
                        </div>
                      </div>

                      <div className="bg-card p-6 rounded border-2 border-primary/30">
                        <p className="font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-lg">
                          <Icon name="Lightbulb" size={20} className="text-primary" />
                          Рекомендации по эксплуатации
                        </p>
                        <ul className="space-y-3">
                          {recommendation.tips.map((tip: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-3 pb-3 border-b border-border last:border-0">
                              <span className="text-primary mt-1 font-bold">▸</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-wider h-14 text-lg">
                        <Icon name="Phone" size={20} className="mr-2" />
                        Связаться со специалистом
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
      <section id="services" className="py-24 industrial-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Услуги</Badge>
            <h3 className="text-5xl font-bold uppercase">Наши решения</h3>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="steel-plate rivet-border hover-scale text-center">
              <CardHeader>
                <div className="text-7xl mb-6 grayscale opacity-80">🔪</div>
                <CardTitle className="uppercase tracking-wider text-xl mb-3">Заточка инструмента</CardTitle>
                <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                <CardDescription className="text-muted-foreground">Профессиональная заточка режущего инструмента на станках CBN</CardDescription>
              </CardHeader>
            </Card>
            <Card className="steel-plate rivet-border hover-scale text-center">
              <CardHeader>
                <div className="text-7xl mb-6 grayscale opacity-80">⚙️</div>
                <CardTitle className="uppercase tracking-wider text-xl mb-3">Производство полотен</CardTitle>
                <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                <CardDescription className="text-muted-foreground">Изготовление пильных полотен под заказ любых размеров</CardDescription>
              </CardHeader>
            </Card>
            <Card className="steel-plate rivet-border hover-scale text-center">
              <CardHeader>
                <div className="text-7xl mb-6 grayscale opacity-80">🪑</div>
                <CardTitle className="uppercase tracking-wider text-xl mb-3">Швейные столы</CardTitle>
                <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                <CardDescription className="text-muted-foreground">Производство профессиональных столов для швейного производства</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section id="gallery" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Галерея</Badge>
            <h3 className="text-5xl font-bold uppercase">Производство</h3>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1,2,3,4,5,6].map(i => (
              <Card key={i} className="steel-plate rivet-border hover-scale overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-muted to-background flex items-center justify-center text-8xl grayscale opacity-60">
                  {['🏭','⚙️','🔧','💎','✨','🔩'][i-1]}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-24 metal-texture relative">
        <div className="absolute inset-0 industrial-grid opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary text-background uppercase tracking-wider font-bold">Контакты</Badge>
            <h3 className="text-5xl font-bold uppercase">Связаться</h3>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="steel-plate rivet-border text-center">
              <CardHeader>
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="uppercase tracking-wider">Телефон</CardTitle>
                <div className="h-1 w-12 bg-primary mx-auto my-3"></div>
                <CardDescription className="text-lg font-semibold text-foreground">+7 (XXX) XXX-XX-XX</CardDescription>
              </CardHeader>
            </Card>
            <Card className="steel-plate rivet-border text-center">
              <CardHeader>
                <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="uppercase tracking-wider">Email</CardTitle>
                <div className="h-1 w-12 bg-primary mx-auto my-3"></div>
                <CardDescription className="text-lg font-semibold text-foreground">info@tehnologiya.ru</CardDescription>
              </CardHeader>
            </Card>
            <Card className="steel-plate rivet-border text-center">
              <CardHeader>
                <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="uppercase tracking-wider">Адрес</CardTitle>
                <div className="h-1 w-12 bg-primary mx-auto my-3"></div>
                <CardDescription className="text-lg font-semibold text-foreground">г. Москва, ул. Промышленная, 1</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-background border-t-2 border-primary/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground uppercase text-xs tracking-wider">© 2024 ООО ПКФ "Технология". Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
