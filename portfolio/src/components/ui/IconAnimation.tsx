
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import PNG Assets
import cardano from "@/assets/icons/cardano.png";
import chart from "@/assets/icons/chart.png";
import ethereum from "@/assets/icons/ethereum.png";
import manta from "@/assets/icons/manta.png";
import monero from "@/assets/icons/monero.png";
import solana from "@/assets/icons/solana.png";
import tether from "@/assets/icons/tether.png";
import tron from "@/assets/icons/tron.png";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function IconAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Arrays for refs
    const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
    const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true);

    // Icon Data
    const extraIcons = [
        { src: cardano, name: 'cardano' },
        { src: ethereum, name: 'ethereum' },
        { src: manta, name: 'manta' },
        { src: solana, name: 'solana' },
        { src: tether, name: 'tether' },
        { src: tron, name: 'tron' },
        { src: monero, name: 'monero' },
        { src: chart, name: 'chart' },
    ];

    // Main BNB Icon (Inline for SVG control)
    const BnbIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-12 h-12 md:w-16 md:h-16 text-[#F0B90B] fill-current origin-center"
        >
            <g fill="none" fillRule="nonzero">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                <path fill="currentColor" d="M14.866 19.345a1 1 0 0 1-.366 1.366l-1.25.722a2.5 2.5 0 0 1-2.5 0L9.5 20.71a1 1 0 0 1 1-1.732l1.25.722a.5.5 0 0 0 .5 0l1.25-.722a1 1 0 0 1 1.366.366Zm4.928-8.226a1 1 0 0 1 1 1v3.515a2.5 2.5 0 0 1-1.25 2.165L16.5 19.557a1 1 0 1 1-1-1.733l3.044-1.757a.5.5 0 0 0 .25-.433v-3.515a1 1 0 0 1 1-1Zm-15.588 0a1 1 0 0 1 1 1v3.515a.5.5 0 0 0 .25.433L8.5 17.824a1 1 0 0 1-1 1.732L4.456 17.8a2.5 2.5 0 0 1-1.25-2.165v-3.515a1 1 0 0 1 1-1Zm11.419-3.654.119.057 1.513.858a1 1 0 0 1 .5.758l.006.12-.013 1.74a1 1 0 0 1-.402.793l-.098.065-2.75 1.588v3.176a1 1 0 0 1-.396.797l-.098.066-1.5.88a1 1 0 0 1-.892.06l-.12-.06-1.5-.88a1 1 0 0 1-.487-.746L9.5 16.62v-3.177l-2.75-1.587a1 1 0 0 1-.492-.742l-.008-.117-.013-1.74a1 1 0 0 1 .406-.811l.1-.066 1.514-.858a1 1 0 0 1 .875-.055l.118.059L12 9.113l2.75-1.587a1 1 0 0 1 .875-.061Zm2.004 5.805v1.403a1 1 0 0 1-.5.866l-1.215.701a.3.3 0 0 1-.45-.26v-1.403a1 1 0 0 1 .5-.866l1.215-.701a.3.3 0 0 1 .45.26Zm-10.87-.287.062.027 1.215.701a1 1 0 0 1 .493.749l.007.117v1.403a.3.3 0 0 1-.389.287l-.061-.027-1.215-.701a1 1 0 0 1-.493-.748l-.007-.118V13.27a.3.3 0 0 1 .326-.3l.063.013Zm11.49-7.53 1.295.748a2.5 2.5 0 0 1 1.25 2.165v1.443a1 1 0 1 1-2 0V8.366a.5.5 0 0 0-.25-.433l-1.295-.748a1 1 0 0 1 1-1.732Zm-11.177.392a1 1 0 0 1-.366 1.366l-1.25.722a.5.5 0 0 0-.25.433v1.443a1 1 0 1 1-2 0V8.366A2.5 2.5 0 0 1 4.456 6.2l1.25-.722a1 1 0 0 1 1.366.366ZM12.5 5.79l1.215.701a.3.3 0 0 1 0 .52L12.5 7.71a1 1 0 0 1-1 0l-1.215-.701a.3.3 0 0 1 0-.52L11.5 5.79a1 1 0 0 1 1 0Zm.75-3.222 3.044 1.757a1 1 0 1 1-1 1.733L12.25 4.299a.5.5 0 0 0-.5 0L8.706 6.056a1 1 0 1 1-1-1.732l3.044-1.757a2.5 2.5 0 0 1 2.5 0Z" />
            </g>
        </svg>
    );

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Iterate through all wrappers/icons
            wrappersRef.current.forEach((wrapper, i) => {
                const icon = iconsRef.current[i];
                if (!wrapper || !icon) return;

                const isMain = i === 0; // The first one is BNB (Loader)

                // -------------------------------------------------------------
                // 1. ENTRY (Match Video)
                // -------------------------------------------------------------
                const entryTl = gsap.timeline({
                    onComplete: () => {
                        if (isMain) {
                            setIsLoading(false);
                            startTransition();
                        }
                    }
                });

                // Random start position for each icon, centered roughly
                // Main icon gets specific behavior, others are random
                const startX = isMain ? -window.innerWidth * 0.3 : (Math.random() - 0.5) * window.innerWidth;
                const startY = isMain ? -window.innerHeight * 0.3 : -window.innerHeight * 0.5 - (Math.random() * 200);

                // Reset initial state
                gsap.set(wrapper, { x: 0, y: 0 });

                // Animate Wrapper for Position
                entryTl.from(wrapper, {
                    x: startX,
                    y: startY,
                    duration: 1.6 + (i * 0.1), // Stagger slightly
                    ease: "power3.out"
                });

                // Animate Icon for Initial Rotation
                entryTl.from(icon, {
                    rotation: 360 * 2,
                    duration: 2.5,
                    ease: "power2.out"
                }, 0);


                // -------------------------------------------------------------
                // 2. LOADING ORBIT (Match Video) - MAIN ONLY
                // -------------------------------------------------------------
                let orbitTl: gsap.core.Timeline | null = null;

                if (isMain) {
                    orbitTl = gsap.timeline({ repeat: -1, paused: true });
                    orbitTl.to(icon, {
                        rotation: "+=360",
                        duration: 2,
                        ease: "linear"
                    });

                    entryTl.call(() => {
                        orbitTl?.play();
                    }, undefined, "-=0.5");
                }


                // -------------------------------------------------------------
                // 3. LOAD COMPLETE -> DROP (Match Video)
                // -------------------------------------------------------------
                const startTransition = () => {
                    // If it's a secondary icon, it follows the main trigger roughly
                    gsap.delayedCall(1.0, () => {
                        if (isMain && orbitTl) orbitTl.pause();

                        const dropTl = gsap.timeline({
                            onComplete: initHeroBehavior
                        });

                        if (isMain) {
                            // Micro-pause
                            dropTl.to(icon, { scale: 1.1, duration: 0.15, ease: "sine.out" });
                            dropTl.to(icon, { scale: 1, duration: 0.1, ease: "sine.in" });
                        }

                        // Drop with Gravity
                        // Target specific distribution areas to avoid stacking
                        // Main icon goes to Hero Right (classic position)
                        // Others go to random spots
                        const targetX = isMain
                            ? window.innerWidth * 0.85
                            : (window.innerWidth * 0.1) + (Math.random() * window.innerWidth * 0.8);

                        const targetY = isMain
                            ? window.innerHeight * 0.2
                            : (window.innerHeight * 0.1) + (Math.random() * window.innerHeight * 0.5);

                        dropTl.to(wrapper, {
                            y: targetY,
                            x: targetX,
                            duration: 1.2 + (Math.random() * 0.5), // Randomize duration slightly
                            ease: "bounce.out"
                        });

                        // Spin while falling
                        dropTl.to(icon, {
                            rotation: "+=90",
                            duration: 1.2,
                            ease: "power2.in"
                        }, "<");
                    });
                };

                // Hook secondary icons to the main transition timing
                if (!isMain) {
                    // Approximate timing sync with main (Exit duration + Delay)
                    const approximateLoadTime = 1.6 + 1.0;
                    gsap.delayedCall(approximateLoadTime, startTransition);
                }


                // -------------------------------------------------------------
                // 4. HERO ROAMING + SCROLL FOLLOW
                // -------------------------------------------------------------
                // Declare timeline variable
                let roamTl: gsap.core.Timeline;

                const initHeroBehavior = () => {
                    // IDLE ROAMING
                    roamTl = gsap.timeline({ repeat: -1, yoyo: true });

                    // Randomize roam params per icon
                    const dur = 3 + Math.random() * 3;
                    let xRoam = 15 + Math.random() * 20;

                    // Adjust roam radius based on icon type if needed
                    if (!isMain) xRoam += 10;

                    roamTl.to(icon, {
                        x: `random(-${xRoam}, ${xRoam})`,
                        y: `random(-15, 15)`,
                        rotation: `random(-10, 10)`,
                        duration: dur,
                        ease: "sine.inOut"
                    });

                    // SCROLL FOLLOW
                    ScrollTrigger.create({
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5 + (Math.random() * 0.5), // Varies lag per icon
                        onUpdate: (self) => {
                            // Varies velocity impact per icon
                            const velFactor = 200 + (Math.random() * 200);
                            gsap.to(wrapper, {
                                y: `+=${self.getVelocity() / velFactor}`,
                                duration: 0.5,
                                ease: "power2.out",
                                overwrite: "auto"
                            });
                        }
                    });

                    // -------------------------------------------------------------
                    // 6. SECTION PERSONALITY (Applies to all)
                    // -------------------------------------------------------------
                    const setRoam = (radius: number, duration: number, rotation: number) => {
                        if (roamTl) {
                            roamTl.clear();
                            roamTl.to(icon, {
                                x: `random(-${radius}, ${radius})`,
                                y: `random(-${radius}, ${radius})`,
                                rotation: `random(-${rotation}, ${rotation})`,
                                duration: duration + (Math.random()),
                                ease: "sine.inOut"
                            });
                            roamTl.repeat(-1).yoyo(true).play();
                        }
                    };

                    // Triggers
                    ScrollTrigger.create({
                        trigger: "#about-section",
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => setRoam(15, 3, 5),
                        onLeaveBack: () => setRoam(25, 4, 10)
                    });

                    ScrollTrigger.create({
                        trigger: "#events",
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => setRoam(30, 2, 20),
                        onLeaveBack: () => setRoam(15, 3, 5)
                    });

                    ScrollTrigger.create({
                        trigger: "#footer",
                        start: "top bottom",
                        onEnter: () => {
                            if (roamTl) {
                                roamTl.clear();
                                roamTl.to(icon, {
                                    scale: 1.05,
                                    duration: 3,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "sine.inOut"
                                });
                            }
                        }
                    });
                };
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {/* Render BNB (Index 0) */}
            <div
                ref={(el) => { wrappersRef.current[0] = el; }}
                className="absolute top-0 left-0 will-change-transform"
                style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
            >
                <div ref={(el) => { iconsRef.current[0] = el; }}>
                    <BnbIcon />
                </div>
            </div>

            {/* Render Extra Icons */}
            {extraIcons.map((iconData, index) => (
                <div
                    key={iconData.name}
                    ref={(el) => { wrappersRef.current[index + 1] = el; }}
                    className="absolute top-0 left-0 will-change-transform"
                    style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                >
                    <div ref={(el) => { iconsRef.current[index + 1] = el; }}>
                        <img
                            src={iconData.src}
                            alt={iconData.name}
                            className="w-10 h-10 md:w-14 md:h-14 opacity-90"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}


