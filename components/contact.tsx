"use client";

import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
    const contactItems = [
        {
            icon: FaEnvelope,
            title: "Email",
            value: "faizan.devstack@gmail.com",
            href: "mailto:faizan.devstack@gmail.com",
        },
        {
            icon: FaMapMarkerAlt,
            title: "Location",
            value: "Islamabad, Pakistan",
            href: null,
        },
    ];

    const socialItems = [
        {
            icon: FaLinkedin,
            href: "https://linkedin.com/in/ifaizan114",
            label: "LinkedIn",
        },
        {
            icon: FaGithub,
            href: "https://github.com/faizan-devstack",
            label: "GitHub",
        },
    ];

    return (
        <section className="h-screen bg-background relative overflow-hidden flex items-center justify-center py-20 border-t border-t-foreground/20">
            <div className="max-w-5xl mx-auto px-8 text-center">
                {/* Title with subtle gradient */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-medium mb-12"
                >
                    Get In Touch
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide"
                >
                    I'm always excited to connect about new ideas, collaborations, or just geek out over code and design.
                </motion.p>

                {/* Consistent Glassy Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 ">
                    {contactItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="block group"
                                >
                                    <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-500 border border-foreground/20 rounded-2xl p-3 ">
                                        <item.icon className="w-12 h-12 mx-auto mb-5" />
                                        <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                                        <p>{item.value}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="text-foreground border border-foreground/20 rounded-2xl p-3">
                                    <item.icon className="w-12 h-12 mx-auto mb-5" />
                                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                                    <p>{item.value}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Consistent Glassy Social Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex justify-center gap-10"
                >
                    {socialItems.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label={social.label}
                        >
                            <social.icon className="w-10 h-10 text-foreground/70 transition-colors duration-500 group-hover:text-foreground" />
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}