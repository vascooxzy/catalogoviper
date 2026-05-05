import React, { useCallback, useEffect, useState } from "react";
import { CoiledViper, SnakeLine, ViperHead } from "./SnakeDecor";

const readStoredValue = (key) => window.localStorage.getItem(key);
const writeStoredValue = (key, value) => window.localStorage.setItem(key, value);
const notifyWelcomeStateChanged = () => {
    window.dispatchEvent(new Event("viper-welcome-state-changed"));
};

// ============================================================
// Welcome Gate — "Aceitas a boleia?" + immersive transition
// ============================================================
export const WelcomeGate = () => {
    const [stage, setStage] = useState("loading"); // loading | gate | transition | done

    const finishGate = useCallback(() => {
        setStage("transition");
        window.setTimeout(() => {
            setStage("done");
            notifyWelcomeStateChanged();
        }, 1800);
    }, []);

    useEffect(() => {
        const accepted = readStoredValue("viper-welcomed");
        if (accepted === "true") {
            setStage("done");
        } else {
            // Small delay before showing gate for cinematic effect
            const timerId = window.setTimeout(() => setStage("gate"), 250);
            return () => window.clearTimeout(timerId);
        }
    }, []);

    const onAccept = () => {
        writeStoredValue("viper-welcomed", "true");
        finishGate();
    };

    const onReject = () => {
        // Soft reject — close but don't persist (so they can reconsider)
        finishGate();
    };

    if (stage === "done") return null;

    return (
        <div
            data-testid="welcome-gate"
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            style={{
                opacity: stage === "transition" ? 0 : 1,
                pointerEvents: stage === "transition" ? "none" : "auto",
                transition: "opacity 1.6s cubic-bezier(0.65,0,0.35,1)",
            }}
        >
            {/* Background atmosphere */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)",
                    }}
                />
                <CoiledViper
                    className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] md:w-[700px] text-white/15 pointer-events-none"
                    stroke={1.5}
                />
                <CoiledViper
                    className="absolute -left-32 top-10 w-[260px] md:w-[420px] text-white/10 pointer-events-none scale-x-[-1]"
                    stroke={1.2}
                />
            </div>

            {/* Slithering snake transition overlay */}
            {stage === "transition" && (
                <div
                    data-testid="welcome-transition"
                    className="absolute inset-0 z-[101] pointer-events-none"
                >
                    <div className="absolute inset-0 bg-black animate-gate-fade" />
                    <SnakeLine
                        className="absolute top-1/2 left-0 w-full text-white animate-gate-slither"
                        opacity={1}
                    />
                </div>
            )}

            {/* Main gate content */}
            <div
                className={`relative z-[1] max-w-2xl w-full px-6 md:px-10 text-center ${
                    stage === "gate" ? "fade-in-up" : ""
                }`}
                style={{ opacity: stage === "gate" ? undefined : 0 }}
            >
                <div className="flex justify-center mb-8">
                    <ViperHead className="w-14 h-9 text-white" />
                </div>

                <div className="font-mono-ui text-[10px] tracking-[0.3em] text-neutral-500 mb-6">
                    // VIPER · CATÁLOGO 2026
                </div>

                <h1
                    className="font-display uppercase text-white leading-[0.9] mb-6"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
                    data-testid="welcome-title"
                >
                    Aceitas a<br />
                    <span className="text-neutral-500">boleia?</span>
                </h1>

                <p className="text-neutral-400 text-base md:text-lg max-w-md mx-auto mb-10">
                    Entra no catálogo Viper. Três modelos, vários
                    acabamentos — pronto para arrancar?
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <button
                        onClick={onAccept}
                        data-testid="welcome-accept"
                        className="group w-full sm:w-auto px-10 py-4 bg-white text-black font-mono-ui text-[11px] uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
                    >
                        Aceito a boleia
                        <ViperHead className="w-5 h-3 text-black group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={onReject}
                        data-testid="welcome-reject"
                        className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white font-mono-ui text-[11px] uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all"
                    >
                        Vou a pé
                    </button>
                </div>

                <div className="mt-12">
                    <SnakeLine
                        className="mx-auto w-48 text-white/40 animate-slither"
                        opacity={0.7}
                    />
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Cookie consent banner (bottom)
// ============================================================
export const CookieBanner = () => {
    const [visible, setVisible] = useState(false);
    const [welcomed, setWelcomed] = useState(false);

    const syncVisibility = useCallback(() => {
        const cookieChoice = readStoredValue("viper-cookies");
        const welcome = readStoredValue("viper-welcomed");
        const hasWelcomed = welcome === "true";

        setWelcomed(hasWelcomed);
        setVisible(!cookieChoice && hasWelcomed);
    }, []);

    useEffect(() => {
        syncVisibility();
        window.addEventListener("storage", syncVisibility);
        window.addEventListener("viper-welcome-state-changed", syncVisibility);

        return () => {
            window.removeEventListener("storage", syncVisibility);
            window.removeEventListener("viper-welcome-state-changed", syncVisibility);
        };
    }, [syncVisibility]);

    const accept = () => {
        writeStoredValue("viper-cookies", "accepted");
        setVisible(false);
    };
    const reject = () => {
        writeStoredValue("viper-cookies", "rejected");
        setVisible(false);
    };

    if (!visible || !welcomed) return null;

    return (
        <div
            data-testid="cookie-banner"
            className="fixed bottom-0 left-0 right-0 z-[90] bg-black/95 backdrop-blur-xl border-t border-white/15"
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 md:py-6">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
                    <div className="col-span-12 md:col-span-7 flex items-start gap-3">
                        <ViperHead className="w-6 h-4 text-white shrink-0 mt-1" />
                        <div>
                            <div className="font-mono-ui text-[10px] text-neutral-500 mb-1">
                                Cookies
                            </div>
                            <p className="text-neutral-300 text-sm leading-relaxed pr-4">
                                Usamos cookies para melhorar a experiência
                                no catálogo. Podes aceitar ou recusar a
                                qualquer momento.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 flex flex-col sm:flex-row gap-2 sm:gap-3 md:justify-end">
                        <button
                            onClick={reject}
                            data-testid="cookie-reject"
                            className="px-6 py-3 border border-white/30 text-white font-mono-ui text-[11px] uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={accept}
                            data-testid="cookie-accept"
                            className="px-6 py-3 bg-white text-black font-mono-ui text-[11px] uppercase tracking-wider hover:bg-neutral-200 transition-all"
                        >
                            Aceitar cookies
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
