import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "@/App.css";
import {
    CoiledViper,
    SnakeLine,
    VerticalSnake,
    ScaleTexture,
    ViperHead,
} from "./components/SnakeDecor";
import { WelcomeGate, CookieBanner } from "./components/WelcomeGate";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";

const LOGO_WHITE = "/assets/logo-white.png";
const LOGO_DARK = "/assets/logo-dark.png";

const HERO_SNAKE =
    "https://images.pexels.com/photos/15466191/pexels-photo-15466191.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800";
const ACCENT_SNAKE =
    "https://images.pexels.com/photos/35735256/pexels-photo-35735256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900";
const COILED_SNAKE =
    "https://images.pexels.com/photos/45246/snake-reptile-coiled-python-45246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900";

const WHEELS = [
    {
        id: "01",
        code: "VPR-BSC",
        name: "Viper Basic",
        desc: "O nosso modelo base. Disponível em 12 acabamentos diferentes — escolhe a cor que combina com o teu carro.",
        tag: "Modelo 01",
        cover: "/assets/viper-basic-cover.png",
        placeholder: false,
        colors: [
            { id: "silver", label: "Prata", hex: "#C8C8CC", accent: "#E8C547", img: "/assets/viper-basic-silver.png" },
            { id: "silver-y", label: "Prata Sport", hex: "#C8C8CC", accent: "#E8C547", img: "/assets/viper-basic-silver-yellow.png" },
            { id: "white", label: "Branco", hex: "#F2F2F2", accent: "#1a1a1a", img: "/assets/viper-basic-white.png" },
            { id: "white-y", label: "Branco Sport", hex: "#F2F2F2", accent: "#E8C547", img: "/assets/viper-basic-white-yellow.png" },
            { id: "black", label: "Preto", hex: "#0E0E0E", accent: "#E8C547", img: "/assets/viper-basic-black-yellow.png" },
            { id: "blue", label: "Azul", hex: "#1B4DCC", accent: "#D1322B", img: "/assets/viper-basic-blue.png" },
            { id: "blue-y", label: "Azul Sport", hex: "#1B4DCC", accent: "#E8C547", img: "/assets/viper-basic-blue-yellow.png" },
            { id: "red", label: "Vermelho", hex: "#C92121", accent: "#0E0E0E", img: "/assets/viper-basic-red.png" },
            { id: "red-y", label: "Vermelho Sport", hex: "#C92121", accent: "#E8C547", img: "/assets/viper-basic-red-yellow.png" },
            { id: "gold", label: "Dourado", hex: "#C9A227", accent: "#0E0E0E", img: "/assets/viper-basic-gold.png" },
            { id: "gold-y", label: "Dourado Sport", hex: "#C9A227", accent: "#E8C547", img: "/assets/viper-basic-gold-yellow.png" },
            { id: "silver-star", label: "Prata Star", hex: "#C8C8CC", accent: "#E8C547", img: "/assets/viper-basic-silver-yellow-star.png" },
        ],
    },
    {
        id: "02",
        code: "VPR-MYV",
        name: "Mr Yunk Vino / YKGG",
        desc: "O nosso modelo desportivo. Design exclusivo Mr Yunk Vino e o submodelo YKGG, com várias cores para escolher.",
        tag: "Modelo 02",
        cover: "/assets/model-02-home-cover-final.jpeg",
        placeholder: false,
        subModels: [
            {
                id: "myv",
                modelCode: "02",
                name: "Mr Yunk Vino",
                desc: "Design de raios finos com tipografia em destaque. Acabamento dourado de série.",
                cover: "/assets/model-02-myv-cover-final.png",
                colors: [
                    { id: "gold", label: "Dourado", hex: "#C9A227", accent: "#F2F2F2", img: "/assets/myv-gold-updated.png" },
                ],
            },
            {
                id: "ykgg",
                modelCode: "02.01",
                name: "YKGG",
                desc: "Submodelo YKGG — design orbital inspirado em estrutura atómica. Disponível em 6 cores.",
                cover: "/assets/model-02-ykgg-cover-final.png",
                colors: [
                    { id: "black", label: "Preto", hex: "#0E0E0E", accent: "#3A3A3A", img: "/assets/atomo-black.png" },
                    { id: "white", label: "Branco", hex: "#F2F2F2", accent: "#0E0E0E", img: "/assets/atomo-white.png" },
                    { id: "red", label: "Vermelho", hex: "#D11A1A", accent: "#0E0E0E", img: "/assets/atomo-red.png" },
                    { id: "blue", label: "Azul", hex: "#143CCC", accent: "#0E0E0E", img: "/assets/atomo-blue.png" },
                    { id: "silver", label: "Prata", hex: "#C8C8CC", accent: "#0E0E0E", img: "/assets/atomo-silver.png" },
                    { id: "gold", label: "Dourado", hex: "#C9A227", accent: "#0E0E0E", img: "/assets/atomo-gold.png" },
                ],
            },
        ],
    },
    {
        id: "03",
        code: "VPR-SOL",
        name: "Sol",
        desc: "Modelo Sol — silhueta solar agressiva com raios irregulares. Acabamento amarelo de série.",
        tag: "Modelo 03",
        cover: "/assets/sol-cover.png",
        placeholder: false,
        colors: [
            { id: "yellow", label: "Amarelo", hex: "#F2C200", accent: "#0E0E0E", img: "/assets/sol-yellow.png" },
        ],
    },
];

const toTestIdSegment = (value) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const getPreviewColors = (wheel) => {
    if (wheel.subModels && wheel.subModels.length > 0) {
        return wheel.subModels.flatMap((subModel) => subModel.colors);
    }

    return wheel.colors || [];
};

const getWheelSummary = ({ wheel, isPlaceholder, hasSubModels }) => {
    if (isPlaceholder) return "Em breve";
    if (hasSubModels) return `${wheel.subModels.length} submodelos`;
    return `${(wheel.colors || []).length} cores`;
};

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setOpen(false);
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname, setOpen]);

    const isActive = (p) => location.pathname === p;

    const linkCls = (p) =>
        `font-mono-ui text-[13px] px-4 py-2 border transition-all duration-300 ${
            isActive(p)
                ? "text-black bg-white border-white"
                : "text-neutral-300 border-white/10 hover:text-white hover:border-white/40 hover:bg-white/5"
        }`;

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-black/75 backdrop-blur-xl border-b border-white/10"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-3 md:py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate("/")}
                    data-testid="logo-btn"
                    className="flex items-center gap-3 group shrink-0"
                    aria-label="Viper — Ir para início"
                >
                    <img
                        src={LOGO_WHITE}
                        alt="Viper"
                        className="h-12 md:h-16 w-auto"
                    />
                </button>

                <nav className="hidden md:flex items-center gap-3 lg:gap-4 ml-auto">
                    <Link to="/" data-testid="nav-home" className={linkCls("/")}>Início</Link>
                    <Link to="/catalogo" data-testid="nav-catalog" className={linkCls("/catalogo")}>Catálogo</Link>
                    <Link to="/sobre" data-testid="nav-about" className={linkCls("/sobre")}>Sobre</Link>
                    <Link to="/manifesto" data-testid="nav-manifesto" className={linkCls("/manifesto")}>Manifesto</Link>
                </nav>

                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                    data-testid="mobile-menu-toggle"
                    aria-label="Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div
                    className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
                    data-testid="mobile-menu"
                >
                    <div className="px-6 py-6 flex flex-col gap-4 font-mono-ui text-xs text-neutral-300">
                        <Link to="/" data-testid="mobile-nav-home" className="py-2">Início</Link>
                        <Link to="/catalogo" data-testid="mobile-nav-catalog" className="py-2">Catálogo</Link>
                        <Link to="/sobre" data-testid="mobile-nav-about" className="py-2">Sobre</Link>
                        <Link to="/manifesto" data-testid="mobile-nav-manifesto" className="py-2">Manifesto</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={HERO_SNAKE}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.15)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black" />
            </div>

            {/* Big prominent coiled viper - right side */}
            <CoiledViper
                className="absolute right-[-40px] top-20 w-[380px] md:w-[520px] h-auto text-white/70 z-[1] pointer-events-none"
                stroke={1.5}
            />
            {/* Vertical slithering snake - left column */}
            <VerticalSnake
                className="hidden md:block absolute left-6 top-40 w-16 h-[520px] text-white/50 z-[1] pointer-events-none animate-slither"
                opacity={0.75}
            />
            <ScaleTexture className="absolute left-1/3 bottom-0 w-[40vw] h-[40vw] text-white/10 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 pt-28">
                <div className="flex items-center justify-between font-mono-ui text-[10px] text-neutral-500">
                    <span className="fade-in-up delay-1">// Coleção / 2026</span>
                    <span className="fade-in-up delay-1">03 Modelos Exclusivos</span>
                </div>
            </div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 pb-20 md:pb-28">
                <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
                    <div className="col-span-12 md:col-span-8">
                        <div
                            className="fade-in-up delay-1 flex items-center gap-3 mb-6 text-neutral-400"
                            data-testid="hero-tag"
                        >
                            <span className="w-8 h-px bg-white/50" />
                            <span className="font-mono-ui text-[11px]">Catálogo Viper</span>
                            <ViperHead className="w-6 h-4 text-white/70" />
                        </div>

                        <h1
                            className="font-display text-white uppercase leading-[0.85] fade-in-up delay-2"
                            style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
                            data-testid="hero-title"
                        >
                            Catálogo<br />
                            <span className="text-neutral-500">Viper.</span>
                        </h1>

                        <div className="mt-10 fade-in-up delay-3">
                            <SnakeLine className="w-72 text-white/70 animate-slither" opacity={0.9} />
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-white/15 fade-in-up delay-3">
                        <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-sm">
                            Três modelos. Vários acabamentos.
                            Escolhe a janta certa para o teu carro.
                        </p>
                        <button
                            onClick={() => navigate("/catalogo")}
                            data-testid="hero-cta"
                            className="mt-8 group inline-flex items-center gap-3 px-6 py-3 border border-white/40 hover:border-white hover:bg-white hover:text-black transition-all font-mono-ui text-[11px] text-white"
                        >
                            Ver Catálogo
                            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CAR_BRANDS = [
    { name: "BMW", icon: "/assets/brand-icons-real/bmw.svg" },
    { name: "Audi", icon: "/assets/brand-icons-real/audi.svg" },
    { name: "Mercedes-Benz", icon: "/assets/brand-icons-real/mercedesbenz.svg" },
    { name: "Volkswagen", icon: "/assets/brand-icons-real/volkswagen.svg" },
    { name: "Porsche", icon: "/assets/brand-icons-real/porsche.svg" },
    { name: "Toyota", icon: "/assets/brand-icons-real/toyota.svg" },
    { name: "Honda", icon: "/assets/brand-icons-real/honda.svg" },
    { name: "Renault", icon: "/assets/brand-icons-real/renault.svg" },
    { name: "Peugeot", icon: "/assets/brand-icons-real/peugeot.svg" },
    { name: "SEAT", icon: "/assets/brand-icons-real/seat.svg" },
    { name: "Fiat", icon: "/assets/brand-icons-real/fiat.svg" },
    { name: "Ford", icon: "/assets/brand-icons-real/ford.svg" },
    { name: "Hyundai", icon: "/assets/brand-icons-real/hyundai.svg" },
    { name: "Kia", icon: "/assets/brand-icons-real/kia.svg" },
    { name: "Mazda", icon: "/assets/brand-icons-real/mazda.svg" },
    { name: "Volvo", icon: "/assets/brand-icons-real/volvo.svg" },
    { name: "Nissan", icon: "/assets/brand-icons-real/nissan.svg" },
    { name: "Tesla", icon: "/assets/brand-icons-real/tesla.svg" },
];

const Marquee = () => {
    const row = [0, 1, 2].flatMap((loop) =>
        CAR_BRANDS.map((brand) => ({
            ...brand,
            marqueeKey: `${toTestIdSegment(brand.name)}-${loop}`,
        })),
    );
    return (
        <section
            data-testid="marquee-section"
            className="relative border-y border-white/10 bg-black py-10 overflow-hidden"
        >
            <div className="flex items-center gap-4 px-6 md:px-12 mb-5 max-w-[1600px] mx-auto">
                <span className="font-mono-ui text-[10px] text-neutral-500">
                    Compatível com
                </span>
                <span className="flex-1 h-px bg-white/10" />
                <span className="font-mono-ui text-[10px] text-neutral-500">
                    {CAR_BRANDS.length}+ marcas
                </span>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-10">
                <div className="relative overflow-hidden border border-white/10 bg-[#070707] p-5 md:p-8" data-testid="brand-logos-wall">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)] pointer-events-none" />
                    <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                        <div>
                            <div className="font-mono-ui text-[10px] text-neutral-500 mb-3">Símbolos compatíveis</div>
                            <h2 className="font-display uppercase text-white text-3xl md:text-5xl leading-[0.9]">
                                Logos<br />
                                <span className="text-neutral-500">automóveis.</span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md">
                            Ícones limpos, sem nomes, para uma leitura mais premium e visualmente alinhada com o catálogo Viper.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 border-t border-l border-white/10 bg-black/30">
                        {CAR_BRANDS.map((brand, i) => (
                            <div
                                key={brand.name}
                                data-testid={`brand-logo-card-${i}`}
                                className="group min-h-[104px] border-r border-b border-white/10 flex items-center justify-center bg-white/[0.015] hover:bg-white/[0.065] transition-colors"
                                title={brand.name}
                            >
                                <img
                                    src={brand.icon}
                                    alt={`${brand.name} logo`}
                                    className="h-9 md:h-10 w-16 object-contain opacity-55 group-hover:opacity-100 group-hover:scale-110 transition-[opacity,transform] duration-300"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-5 flex items-center justify-between gap-4 font-mono-ui text-[10px] text-neutral-500">
                        <span>Sem nomes / só símbolos</span>
                        <span>{CAR_BRANDS.length} marcas</span>
                    </div>
                </div>
            </div>

            <div className="flex animate-marquee whitespace-nowrap items-center">
                {row.map((b, i) => (
                    <div
                        key={b.marqueeKey}
                        className="mx-8 md:mx-12 flex items-center justify-center shrink-0 group"
                        title={b.name}
                    >
                        <img
                            src={b.icon}
                            alt={`${b.name} logo`}
                            data-testid={`brand-marquee-${b.marqueeKey}`}
                            className="h-7 w-16 object-contain opacity-35 group-hover:opacity-80 transition-opacity"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

const SplitCoverBanner = ({ wheel, activeSub, onChangeSub }) => (
    <div
        className="model-split-cover relative w-full h-[220px] md:h-[340px] overflow-hidden border-b border-white/10 flex"
        data-testid={`wheel-split-cover-${wheel.id}`}
    >
        {wheel.subModels.map((subModel, subIndex) => (
            <button
                type="button"
                key={subModel.id}
                onClick={() => onChangeSub(subIndex)}
                onMouseEnter={() => onChangeSub(subIndex)}
                onFocus={() => onChangeSub(subIndex)}
                data-testid={`split-cover-${wheel.id}-${subModel.id}`}
                className={`relative overflow-hidden text-left group/split border-r border-white/10 last:border-r-0 transition-[flex-basis,filter] duration-500 ${
                    subIndex === activeSub ? "basis-[58%] grayscale-0" : "basis-[42%] grayscale"
                }`}
            >
                <img
                    src={subModel.cover}
                    alt={`${subModel.name} capa`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/split:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                        <div className="font-display text-5xl md:text-7xl text-white leading-none">
                            {subModel.modelCode}
                        </div>
                        <div className="mt-2 font-mono-ui text-[10px] text-white/70">
                            {subModel.name}
                        </div>
                    </div>
                    <ArrowUpRight size={16} className="text-white/70 group-hover/split:rotate-45 transition-transform" />
                </div>
            </button>
        ))}
        <div className="absolute top-4 left-5 font-mono-ui text-[10px] text-white/80 pointer-events-none">
            VPR-MYV · Modelo 02 / 02.01
        </div>
    </div>
);

const StandardCoverBanner = ({ wheel }) => {
    if (!wheel.cover) return null;

    return (
        <div className="relative w-full h-[180px] md:h-[280px] overflow-hidden border-b border-white/10" data-testid={`wheel-cover-${wheel.id}`}>
            <img src={wheel.cover} alt={`${wheel.name} cover`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 font-mono-ui text-[10px] text-white/80">
                {wheel.code} · Capa do Modelo
            </div>
        </div>
    );
};

const WheelCoverBanner = ({ wheel, hasSubModels, activeSub, onChangeSub }) => {
    const splitCovers = hasSubModels && wheel.subModels.every((subModel) => subModel.cover);

    if (splitCovers) {
        return <SplitCoverBanner wheel={wheel} activeSub={activeSub} onChangeSub={onChangeSub} />;
    }

    return <StandardCoverBanner wheel={wheel} />;
};

const WheelImageStage = ({ wheel, activeColors, activeColor, activeSub, isPlaceholder }) => (
    <div className="col-span-12 md:col-span-7 relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b md:border-b-0 md:border-r border-white/10 p-3 md:p-6 flex items-center justify-center overflow-hidden min-h-[420px] md:min-h-[600px]">
        <ScaleTexture className="absolute inset-0 w-full h-full text-white/5" />
        <VerticalSnake className="absolute left-3 top-3 bottom-3 w-8 text-white/25 pointer-events-none z-[1]" opacity={0.45} />
        <div className="relative w-full h-full flex items-center justify-center">
            {isPlaceholder ? (
                <div className="w-full h-full border border-dashed border-white/20 flex items-center justify-center">
                    <div className="text-center">
                        <ViperHead className="w-16 h-10 text-white/25 mx-auto mb-4" />
                        <div className="font-mono-ui text-[11px] text-neutral-500">Imagens em breve</div>
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    {activeColors.map((colorOption, colorIndex) => (
                        <img
                            key={`${activeSub}-${colorOption.id}`}
                            src={colorOption.img}
                            alt={`${wheel.name} ${colorOption.label}`}
                            data-testid={colorIndex === activeColor ? `wheel-img-${wheel.id}` : undefined}
                            className="wheel-img absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out"
                            style={{
                                opacity: colorIndex === activeColor ? 1 : 0,
                                pointerEvents: colorIndex === activeColor ? "auto" : "none",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
        <span className="absolute top-5 left-5 font-mono-ui text-[10px] text-neutral-500 z-[2]">{wheel.code}</span>
        <span className="absolute bottom-5 right-5 font-mono-ui text-[10px] text-neutral-500 z-[2]">{wheel.tag}</span>
    </div>
);

const SubModelSelector = ({ wheel, activeSub, onChangeSub }) => {
    if (!wheel.subModels) return null;

    return (
        <div className="mb-6" data-testid={`submodels-${wheel.id}`}>
            <div className="font-mono-ui text-[10px] text-neutral-500 mb-3">
                Submodelos / {wheel.subModels.length}
            </div>
            <div className="flex flex-wrap gap-2">
                {wheel.subModels.map((subModel, subIndex) => (
                    <button
                        key={subModel.id}
                        onClick={() => onChangeSub(subIndex)}
                        onMouseEnter={() => onChangeSub(subIndex)}
                        data-testid={`submodel-${wheel.id}-${subModel.id}`}
                        className={`px-4 py-2 border font-mono-ui text-[11px] uppercase transition-all duration-300 ${
                            subIndex === activeSub
                                ? "border-white bg-white text-black"
                                : "border-white/20 text-neutral-400 hover:border-white/60 hover:text-white"
                        }`}
                    >
                        {subModel.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ColorSelector = ({ wheel, activeColors, activeColor, activeSub, current, onChangeColor }) => {
    if (activeColors.length === 0) return null;

    return (
        <div className="mt-8" data-testid={`wheel-colors-${wheel.id}`}>
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono-ui text-[10px] text-neutral-500">
                    Cor / {activeColors.length} {activeColors.length === 1 ? "opção" : "opções"}
                </span>
                <span className="font-mono-ui text-[10px] text-white">{current.label}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
                {activeColors.map((colorOption, colorIndex) => (
                    <button
                        key={`${activeSub}-${colorOption.id}-btn`}
                        onClick={() => onChangeColor(colorIndex)}
                        onMouseEnter={() => onChangeColor(colorIndex)}
                        onFocus={() => onChangeColor(colorIndex)}
                        data-testid={`color-${wheel.id}-${colorOption.id}`}
                        aria-label={colorOption.label}
                        title={colorOption.label}
                        className={`relative w-9 h-9 border transition-all duration-300 ${
                            colorIndex === activeColor
                                ? "border-white scale-110"
                                : "border-white/20 hover:border-white/60"
                        }`}
                        style={{ backgroundColor: colorOption.hex }}
                    >
                        <span
                            className="absolute bottom-0 right-0 w-2.5 h-2.5"
                            style={{ backgroundColor: colorOption.accent }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

const WheelDetailsPanel = ({ wheel, hasSubModels, activeSub, activeDesc, activeColors, activeColor, current, onChangeSub, onChangeColor }) => (
    <div className="col-span-12 md:col-span-5 p-8 md:p-14 flex flex-col justify-between relative">
        <div>
            <div className="flex items-center justify-between mb-8">
                <span className="font-display text-7xl md:text-8xl text-white/10 leading-none">{wheel.id}</span>
                <ViperHead className="w-10 h-6 text-white/40" />
            </div>

            <h3 className="font-display uppercase text-white leading-[0.9]" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}>
                {wheel.name}
            </h3>

            <div className="mt-6 mb-6 viper-divider" />
            {hasSubModels && <SubModelSelector wheel={wheel} activeSub={activeSub} onChangeSub={onChangeSub} />}

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">{activeDesc}</p>

            <ColorSelector
                wheel={wheel}
                activeColors={activeColors}
                activeColor={activeColor}
                activeSub={activeSub}
                current={current}
                onChangeColor={onChangeColor}
            />
        </div>

        <div className="mt-10 flex items-center justify-between">
            <div className="font-mono-ui text-[10px] text-neutral-500">Ref. {wheel.code}</div>
            <div className="flex items-center gap-3 text-neutral-400 group-hover:text-white transition-colors">
                <span className="font-mono-ui text-[11px]">
                    {getWheelSummary({ wheel, isPlaceholder: wheel.placeholder, hasSubModels })}
                </span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </div>
        </div>
    </div>
);

const WheelRow = ({ wheel, index }) => {
    const reverse = index % 2 === 1;
    const hasSubModels = Array.isArray(wheel.subModels) && wheel.subModels.length > 0;
    const activeSubModels = hasSubModels ? wheel.subModels : [];
    const isPlaceholder = wheel.placeholder;

    const [activeSub, setActiveSub] = useState(0);
    const [activeColor, setActiveColor] = useState(0);

    const onChangeSub = useCallback((subIndex) => {
        setActiveSub(subIndex);
        setActiveColor(0);
    }, []);

    const activeColors = hasSubModels ? activeSubModels[activeSub].colors : wheel.colors || [];
    const current = !isPlaceholder ? activeColors[activeColor] : null;
    const activeDesc = hasSubModels ? activeSubModels[activeSub].desc : wheel.desc;

    return (
        <article
            data-testid={`wheel-${wheel.id}`}
            className="wheel-card group relative border border-white/10 bg-[#0a0a0a] overflow-hidden"
        >
            <WheelCoverBanner wheel={wheel} hasSubModels={hasSubModels} activeSub={activeSub} onChangeSub={onChangeSub} />

            <div className={`grid grid-cols-12 min-h-[480px] ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <WheelImageStage
                    wheel={wheel}
                    activeColors={activeColors}
                    activeColor={activeColor}
                    activeSub={activeSub}
                    isPlaceholder={isPlaceholder}
                />
                <WheelDetailsPanel
                    wheel={wheel}
                    hasSubModels={hasSubModels}
                    activeSub={activeSub}
                    activeDesc={activeDesc}
                    activeColors={isPlaceholder ? [] : activeColors}
                    activeColor={activeColor}
                    current={current}
                    onChangeSub={onChangeSub}
                    onChangeColor={setActiveColor}
                />
            </div>
        </article>
    );
};

const CatalogSection = ({ showHeader = true }) => {
    return (
        <section
            id="catalogo"
            data-testid="catalog-section"
            className="relative bg-black py-24 md:py-36"
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                {showHeader && (
                    <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
                        <div className="col-span-12 md:col-span-5">
                            <div className="flex items-center gap-3 mb-6 text-neutral-400">
                                <span className="w-8 h-px bg-white/40" />
                                <span className="font-mono-ui text-[11px]">Catálogo / 03 modelos</span>
                                <ViperHead className="w-6 h-4 text-white/50" />
                            </div>
                            <h2
                                className="font-display uppercase text-white leading-[0.9]"
                                style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
                            >
                                Os três<br />
                                <span className="text-neutral-500">modelos.</span>
                            </h2>
                        </div>
                        <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
                            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                                Três modelos diferentes, vários acabamentos
                                disponíveis. Cada um com nome, referência e
                                imagem.
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-10 md:space-y-14">
                    {WHEELS.map((w, i) => (
                        <WheelRow key={w.id} wheel={w} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const PageHero = ({ eyebrow, title, subtitle, testId = "page-hero" }) => (
    <section data-testid={testId} className="relative pt-40 pb-20 md:pt-56 md:pb-28 bg-black overflow-hidden border-b border-white/10">
        <VerticalSnake className="absolute right-10 top-24 w-20 h-[420px] text-white/30 pointer-events-none animate-slither" opacity={0.6} />
        <ScaleTexture className="absolute left-0 bottom-0 w-[30vw] h-[30vw] text-white/5 pointer-events-none" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-6 text-neutral-400">
                <span className="w-8 h-px bg-white/40" />
                <span data-testid={`${testId}-eyebrow`} className="font-mono-ui text-[11px]">{eyebrow}</span>
                <ViperHead className="w-6 h-4 text-white/60" />
            </div>
            <h1
                className="font-display uppercase text-white leading-[0.9] max-w-5xl"
                style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
                data-testid={`${testId}-title`}
            >
                {title}
            </h1>
            {subtitle && (
                <p data-testid={`${testId}-subtitle`} className="mt-8 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    </section>
);

const PlaceholderPreview = () => (
    <div className="w-full h-full border border-dashed border-white/15 flex flex-col items-center justify-center">
        <ViperHead className="w-12 h-7 text-white/25 mb-3" />
        <span className="font-mono-ui text-[10px] text-neutral-500">Em breve</span>
    </div>
);

const SplitPreview = ({ wheel, previewImg }) => (
    <div className="absolute inset-0" data-testid={`home-wheel-split-${wheel.id}`}>
        <img
            src={previewImg}
            alt={`${wheel.name} capa`}
            className="absolute inset-0 w-full h-full object-cover transition-[opacity,transform,filter] duration-700 group-hover:opacity-0 group-hover:scale-95 group-hover:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between transition-opacity duration-500 group-hover:opacity-0">
            <div>
                <div className="font-display text-white text-5xl leading-none">02</div>
                <div className="mt-2 font-mono-ui text-[10px] text-white/70">Ver submodelos</div>
            </div>
            <ArrowUpRight size={16} className="text-white/70" />
        </div>

        <div className="absolute inset-0 flex opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-100 transition-[opacity,transform] duration-500">
            {wheel.subModels.map((subModel, subIndex) => (
                <div
                    key={subModel.id}
                    className={`home-model-choice relative overflow-hidden border-white/10 ${
                        subIndex === 0 ? "border-r" : ""
                    }`}
                >
                    <img
                        src={subModel.cover}
                        alt={`${subModel.name} capa`}
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="font-display text-white text-4xl md:text-5xl leading-none">
                            {subModel.modelCode}
                        </div>
                        <div className="mt-2 font-mono-ui text-[9px] text-white/70">
                            {subModel.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StandardPreview = ({ wheel, previewImg }) => (
    <img
        src={previewImg}
        alt={wheel.name}
        className={`w-full h-full transition-transform duration-700 ${
            wheel.cover ? "object-cover" : "object-contain group-hover:scale-105"
        }`}
    />
);

const HomeWheelMedia = ({ wheel, previewColors, previewImg }) => {
    const hasPreviewSplit = wheel.subModels && wheel.subModels.every((subModel) => subModel.cover);

    if (wheel.placeholder) return <PlaceholderPreview />;
    if (hasPreviewSplit) return <SplitPreview wheel={wheel} previewImg={previewImg} />;

    return <StandardPreview wheel={wheel} previewImg={previewImg || previewColors[0]?.img} />;
};

const PreviewColorSwatches = ({ colors }) => {
    if (colors.length === 0) return null;

    return (
        <div className="flex gap-1 mt-3">
            {colors.slice(0, 6).map((colorOption) => (
                <span
                    key={`${colorOption.id}-${colorOption.img}`}
                    className="w-3 h-3 border border-white/20"
                    style={{ backgroundColor: colorOption.hex }}
                />
            ))}
            {colors.length > 6 && (
                <span className="font-mono-ui text-[9px] text-neutral-500 ml-1">
                    +{colors.length - 6}
                </span>
            )}
        </div>
    );
};

const HomeWheelCard = ({ wheel }) => {
    const previewColors = getPreviewColors(wheel);
    const previewImg = wheel.cover || previewColors[0]?.img;

    return (
        <Link
            to="/catalogo"
            data-testid={`home-wheel-${wheel.id}`}
            className="group relative border border-white/10 bg-[#0a0a0a] p-6 hover:border-white/30 transition-all overflow-hidden"
        >
            <ScaleTexture className="absolute inset-0 w-full h-full text-white/5" />
            <div className="relative aspect-square flex items-center justify-center mb-4 overflow-hidden">
                <HomeWheelMedia wheel={wheel} previewColors={previewColors} previewImg={previewImg} />
            </div>
            <div className="relative flex items-center justify-between">
                <div>
                    <div className="font-mono-ui text-[10px] text-neutral-500">{wheel.code}</div>
                    <div className="font-display uppercase text-white text-2xl mt-1">{wheel.name}</div>
                    {!wheel.placeholder && <PreviewColorSwatches colors={previewColors} />}
                </div>
                <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-white group-hover:rotate-45 transition-all" />
            </div>
        </Link>
    );
};

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Hero />
            <Marquee />

            {/* Catalog preview on home */}
            <section className="relative bg-black py-20 md:py-28 overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                        <div>
                            <div className="flex items-center gap-3 mb-6 text-neutral-400">
                                <span className="w-8 h-px bg-white/40" />
                                <span className="font-mono-ui text-[11px]">O catálogo</span>
                            </div>
                            <h2
                                className="font-display uppercase text-white leading-[0.9]"
                                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                            >
                                Os três<br />
                                <span className="text-neutral-500">modelos.</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate("/catalogo")}
                            data-testid="home-catalog-cta"
                            className="group self-start inline-flex items-center gap-3 px-6 py-3 border border-white/40 hover:bg-white hover:text-black transition-all font-mono-ui text-[11px] text-white"
                        >
                            Ver Catálogo Completo
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {WHEELS.map((wheel) => (
                            <HomeWheelCard key={wheel.id} wheel={wheel} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sobre + Manifesto teasers */}
            <section className="relative bg-black border-t border-white/10">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2">
                    <Link
                        to="/sobre"
                        data-testid="home-about-cta"
                        className="group relative p-10 md:p-16 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden hover:bg-[#0c0c0c] transition-colors"
                    >
                        <VerticalSnake className="absolute right-8 top-8 w-14 h-64 text-white/20 group-hover:text-white/50 transition-colors" opacity={1} />
                        <div className="font-mono-ui text-[11px] text-neutral-500 mb-6">/ Sobre</div>
                        <h3 className="font-display uppercase text-white text-4xl md:text-6xl leading-[0.95]">
                            A marca<br />
                            <span className="text-neutral-500">Viper.</span>
                        </h3>
                        <div className="mt-8 inline-flex items-center gap-3 text-white font-mono-ui text-[11px]">
                            Saber mais <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                        </div>
                    </Link>
                    <Link
                        to="/manifesto"
                        data-testid="home-manifesto-cta"
                        className="group relative p-10 md:p-16 overflow-hidden hover:bg-[#0c0c0c] transition-colors"
                    >
                        <CoiledViper className="absolute right-[-20px] top-6 w-48 text-white/20 group-hover:text-white/40 transition-colors" stroke={1.5} />
                        <div className="font-mono-ui text-[11px] text-neutral-500 mb-6">/ Manifesto</div>
                        <h3 className="font-display uppercase text-white text-4xl md:text-6xl leading-[0.95]">
                            Os nossos<br />
                            <span className="text-neutral-500">valores.</span>
                        </h3>
                        <div className="mt-8 inline-flex items-center gap-3 text-white font-mono-ui text-[11px]">
                            Ver valores <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
};

const CatalogPage = () => {
    return (
        <>
            <PageHero
                eyebrow="Catálogo / 03 modelos"
                title={<>A ninhada <span className="text-neutral-500">Viper.</span></>}
                subtitle="Três jantes distintas na geometria, nos acabamentos e na atitude. Escolhe o modelo, passa pelas cores e encontra o encaixe certo para o teu carro."
                testId="catalog-page-hero"
            />
            <CatalogSection showHeader={false} />
        </>
    );
};

const SobrePage = () => {
    return (
        <>
            <PageHero
                eyebrow="Sobre / A marca"
                title={<>Sobre a <span className="text-neutral-500">Viper.</span></>}
                testId="about-page-hero"
            />
            <section className="relative bg-black py-20 md:py-28 overflow-hidden" data-testid="about-section">
                <img
                    src={ACCENT_SNAKE}
                    alt=""
                    aria-hidden="true"
                    className="absolute -right-20 top-20 w-[45vw] max-w-[700px] opacity-30 pointer-events-none hidden md:block"
                    style={{ filter: "grayscale(100%) contrast(1.2)" }}
                />
                <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-12 gap-6 md:gap-12">
                        <div className="col-span-12 md:col-span-7 space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
                            <p>
                                <span className="text-white">A Viper é uma marca de jantes.</span> Apresentamos três modelos diferentes, cada um com vários acabamentos para escolher.
                            </p>
                            <p>
                                A nossa identidade é <span className="text-white">monocromática</span> (preto, cinza e branco) — mas as próprias jantes podem ter várias cores, desde acabamentos discretos a versões mais desportivas com acentos amarelos, vermelhos ou dourados.
                            </p>
                            <p>
                                Este site serve como <span className="text-white">catálogo visual</span>: mostra os três modelos disponíveis, com nome, referência e imagens reais. Passa o rato sobre as cores para veres cada acabamento. Sem formulários, sem complicações.
                            </p>
                            <p>
                                Marca portuguesa. Coleção 2026. Três modelos, várias cores, uma atitude.
                            </p>
                        </div>
                        <aside className="col-span-12 md:col-span-4 md:col-start-9 border border-white/10 p-6 md:p-8 bg-[#0a0a0a] self-start">
                            <div className="font-mono-ui text-[10px] text-neutral-500 mb-4">Resumo</div>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-neutral-500">Modelos</span>
                                    <span className="text-white">Três</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-neutral-500">Acabamentos</span>
                                    <span className="text-white text-right">Vários por modelo</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-neutral-500">Coleção</span>
                                    <span className="text-white">2026</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-neutral-500">País</span>
                                    <span className="text-white">Portugal</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-neutral-500">Tipo</span>
                                    <span className="text-white">Catálogo visual</span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

const ManifestoPage = () => {
    const pillars = [
        {
            n: "01",
            title: "Identidade monocromática.",
            text: "O nosso site, a nossa marca e a nossa comunicação são em preto, cinza e branco. Limpo, simples e direto — sem distrações.",
        },
        {
            n: "02",
            title: "Várias cores nas jantes.",
            text: "Cada modelo está disponível em vários acabamentos. Combina com o estilo do teu carro — desde o discreto ao mais desportivo.",
        },
        {
            n: "03",
            title: "Só três modelos.",
            text: "Não queremos um catálogo enorme. Três jantes, bem escolhidas. Menos opções, decisão mais fácil.",
        },
        {
            n: "04",
            title: "Feito em Portugal.",
            text: "Marca portuguesa, catálogo 2026. Pensado para quem gosta de carros com personalidade, sem exageros.",
        },
    ];

    return (
        <>
            <PageHero
                eyebrow="Manifesto / Os nossos valores"
                title={<>Os nossos<br /><span className="text-neutral-500">valores.</span></>}
                subtitle="Quatro ideias simples que explicam o que fazemos e porquê."
                testId="manifesto-page-hero"
            />

            <section className="relative bg-black py-20 md:py-28 overflow-hidden" data-testid="manifesto-section">
                <CoiledViper className="absolute -right-16 top-10 w-[360px] text-white/25 pointer-events-none hidden md:block" stroke={1.5} />
                <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
                    <ol className="space-y-0 border-t border-white/10">
                        {pillars.map((p) => (
                            <li
                                key={p.n}
                                data-testid={`pillar-${p.n}`}
                                className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-b border-white/10 group hover:bg-[#0a0a0a] transition-colors px-2 md:px-4"
                            >
                                <div className="col-span-12 md:col-span-2 font-display text-white/30 text-5xl md:text-7xl leading-none group-hover:text-white transition-colors">
                                    {p.n}
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <h3 className="font-display uppercase text-white text-2xl md:text-4xl leading-[0.95]">
                                        {p.title}
                                    </h3>
                                </div>
                                <div className="col-span-12 md:col-span-5 text-neutral-400 text-base md:text-lg leading-relaxed flex items-center">
                                    {p.text}
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-16 md:mt-20 text-center">
                        <SnakeLine className="mx-auto w-72 text-white/60 animate-slither mb-8" opacity={0.9} />
                        <p
                            className="font-display uppercase text-white leading-[0.95] max-w-3xl mx-auto"
                            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
                            data-testid="manifesto-quote"
                        >
                            Simples. Direto.<br />
                            <span className="text-neutral-500">Monocromático.</span>
                        </p>
                        <div className="mt-8 font-mono-ui text-[11px] text-neutral-500">
                            Viper · Catálogo 2026
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const Footer = () => {
    return (
        <footer data-testid="site-footer" className="relative border-t border-white/10 bg-black overflow-hidden">
            <VerticalSnake className="absolute left-[10%] top-8 bottom-8 w-12 text-white/15 hidden md:block pointer-events-none" opacity={0.5} />
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-14 relative">
                <div className="grid grid-cols-12 gap-6 md:gap-12">
                    <div className="col-span-12 md:col-span-6">
                        <img src={LOGO_WHITE} alt="Viper" className="h-10 w-auto mb-6" />
                        <p className="text-neutral-500 text-sm max-w-sm">
                            Catálogo Viper — três modelos com vários
                            acabamentos. Identidade monocromática, jantes
                            com personalidade.
                        </p>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-mono-ui text-[10px] text-neutral-500 mb-4">Navegação</div>
                        <ul className="space-y-2 text-neutral-300 text-sm">
                            <li><Link to="/" className="hover:text-white" data-testid="footer-link-home">Início</Link></li>
                            <li><Link to="/catalogo" className="hover:text-white" data-testid="footer-link-catalog">Catálogo</Link></li>
                            <li><Link to="/sobre" className="hover:text-white" data-testid="footer-link-about">Sobre</Link></li>
                            <li><Link to="/manifesto" className="hover:text-white" data-testid="footer-link-manifesto">Manifesto</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-mono-ui text-[10px] text-neutral-500 mb-4">Paleta</div>
                        <div className="flex gap-2">
                            <span className="w-8 h-8 bg-white border border-white/20" title="Branco" />
                            <span className="w-8 h-8 bg-neutral-500 border border-white/20" title="Cinza" />
                            <span className="w-8 h-8 bg-black border border-white/20" title="Preto" />
                        </div>
                        <img src={LOGO_DARK} alt="Viper monograma" className="mt-6 h-8 w-auto opacity-40" />
                    </div>
                </div>

                <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-ui text-[10px] text-neutral-500">
                    <span data-testid="footer-copy">© 2026 Viper Catálogo — Feito por Diego Melo.</span>
                    <span>Monocromático / PT / 03 Modelos</span>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => (
    <div className="relative grain bg-black text-white min-h-screen">
        <Header />
        {children}
        <Footer />
    </div>
);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <WelcomeGate />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogo" element={<CatalogPage />} />
                        <Route path="/sobre" element={<SobrePage />} />
                        <Route path="/manifesto" element={<ManifestoPage />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Layout>
                <CookieBanner />
            </BrowserRouter>
        </div>
    );
}

export default App;
