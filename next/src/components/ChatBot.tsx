'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.scss';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: Option[];
  timestamp: Date;
}

interface Option {
  id: string;
  label: string;
  action: 'menu' | 'whatsapp' | 'response';
  data?: any;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = '573222101885';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showWelcomeMessage();
    }
  }, [isOpen]);

  const showWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: '¡Hola! 👋 Bienvenido a XCP. Somos distribuidores de equipos y herramientas industriales. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      options: getMainMenuOptions(),
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const getMainMenuOptions = (): Option[] => {
    return [
      { id: '1', label: '🛒 Ver Productos', action: 'menu', data: 'products' },
      { id: '2', label: '📦 Información de Envíos', action: 'menu', data: 'shipping' },
      { id: '3', label: '💳 Formas de Pago', action: 'menu', data: 'payment' },
      { id: '4', label: '🔧 Servicios', action: 'menu', data: 'services' },
      { id: '5', label: '📞 Contacto y Horarios', action: 'menu', data: 'contact' },
      { id: '6', label: '💬 Hablar con Asesor', action: 'whatsapp', data: 'general' },
    ];
  };

  const addMessage = (text: string, sender: 'bot' | 'user', options?: Option[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      options,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    addMessage(text, 'user');
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionClick = (option: Option) => {
    addUserMessage(option.label);

    if (option.action === 'whatsapp') {
      simulateTyping(() => {
        handleWhatsAppRedirect(option.data);
      }, 500);
    } else if (option.action === 'menu') {
      simulateTyping(() => {
        handleMenuOption(option.data);
      }, 800);
    } else if (option.action === 'response') {
      simulateTyping(() => {
        addMessage(option.data.response, 'bot', option.data.options);
      }, 800);
    }
  };

  const handleMenuOption = (menuId: string) => {
    switch (menuId) {
      case 'products':
        showProductsMenu();
        break;
      case 'shipping':
        showShippingInfo();
        break;
      case 'payment':
        showPaymentInfo();
        break;
      case 'services':
        showServicesInfo();
        break;
      case 'contact':
        showContactInfo();
        break;
      case 'products-detail':
        showProductCategories();
        break;
      default:
        showMainMenu();
    }
  };

  const showProductsMenu = () => {
    addMessage(
      '¿Qué tipo de productos te interesan?',
      'bot',
      [
        { id: 'p1', label: '💧 Bombas Sumergibles', action: 'response', data: {
          response: 'Contamos con bombas Tsurumi para agua limpia y residual, ideales para minería, construcción y agroindustria. ¿Te gustaría conocer más detalles o cotizar?',
          options: [
            { id: 'wp1', label: '📱 Cotizar Bombas', action: 'whatsapp', data: 'bombas' },
            { id: 'back1', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
          ]
        }},
        { id: 'p2', label: '🔧 Herramientas Eléctricas', action: 'response', data: {
          response: 'Tenemos herramientas profesionales Makita, DeWalt y Bosch: taladros, sierras, esmeriladoras, rotomartillos y más. ¿Qué herramienta necesitas?',
          options: [
            { id: 'wp2', label: '📱 Cotizar Herramientas', action: 'whatsapp', data: 'herramientas' },
            { id: 'back2', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
          ]
        }},
        { id: 'p3', label: '⚙️ Generadores y Motores', action: 'response', data: {
          response: 'Distribuimos motores y generadores Honda de alta calidad para uso industrial y comercial. ¿Te interesa conocer las especificaciones?',
          options: [
            { id: 'wp3', label: '📱 Cotizar Generadores', action: 'whatsapp', data: 'generadores' },
            { id: 'back3', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
          ]
        }},
        { id: 'p4', label: '🌳 Jardinería y Forestal', action: 'response', data: {
          response: 'Equipos Stihl profesionales: motosierras, guadañadoras, sopladoras. Perfectos para mantenimiento de áreas verdes.',
          options: [
            { id: 'wp4', label: '📱 Cotizar Equipos Stihl', action: 'whatsapp', data: 'jardineria' },
            { id: 'back4', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
          ]
        }},
        { id: 'p5', label: '🛢️ Lubricantes WD-40', action: 'response', data: {
          response: 'WD-40 en presentaciones de galón y 5 galones. Lubrica, protege y limpia. Ideal para talleres e industria.',
          options: [
            { id: 'wp5', label: '📱 Cotizar WD-40', action: 'whatsapp', data: 'wd40' },
            { id: 'back5', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
          ]
        }},
        { id: 'back', label: '⬅️ Volver al Menú Principal', action: 'menu', data: 'main' }
      ]
    );
  };

  const showProductCategories = () => {
    addMessage(
      'Estas son nuestras categorías principales:',
      'bot',
      [
        { id: 'cat1', label: 'Bombeo', action: 'whatsapp', data: 'categoria-bombeo' },
        { id: 'cat2', label: 'Herramienta Eléctrica', action: 'whatsapp', data: 'categoria-herramientas' },
        { id: 'cat3', label: 'Generación y Motores', action: 'whatsapp', data: 'categoria-generadores' },
        { id: 'cat4', label: 'Jardinería y Forestal', action: 'whatsapp', data: 'categoria-jardineria' },
        { id: 'cat5', label: 'Soldaduras', action: 'whatsapp', data: 'categoria-soldaduras' },
        { id: 'back', label: '⬅️ Volver', action: 'menu', data: 'main' }
      ]
    );
  };

  const showShippingInfo = () => {
    addMessage(
      '📦 Realizamos envíos a TODA COLOMBIA 🇨🇴\n\n' +
      '✅ Envío nacional con transportadoras confiables\n' +
      '✅ Embalaje seguro y protegido\n' +
      '✅ Seguimiento de tu pedido\n' +
      '✅ Tiempos estimados de 2-5 días hábiles según destino\n\n' +
      '¿Quieres consultar el costo de envío a tu ciudad?',
      'bot',
      [
        { id: 'ws1', label: '📱 Consultar Envío', action: 'whatsapp', data: 'envio' },
        { id: 'back', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
      ]
    );
  };

  const showPaymentInfo = () => {
    addMessage(
      '💳 Aceptamos las siguientes formas de pago:\n\n' +
      '✅ Tarjetas de crédito y débito\n' +
      '✅ Transferencias bancarias\n' +
      '✅ Consignaciones\n' +
      '✅ PSE (Pagos seguros en línea)\n' +
      '✅ Efectivo en nuestra sede\n\n' +
      'Para empresas ofrecemos crédito con cupo preaprobado. ¿Necesitas más información?',
      'bot',
      [
        { id: 'wp1', label: '📱 Información de Pago', action: 'whatsapp', data: 'pago' },
        { id: 'wp2', label: '💼 Crédito Empresarial', action: 'whatsapp', data: 'credito' },
        { id: 'back', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
      ]
    );
  };

  const showServicesInfo = () => {
    addMessage(
      '🔧 Servicios XCP:\n\n' +
      '✅ Asesoría técnica especializada\n' +
      '✅ Servicio técnico y mantenimiento\n' +
      '✅ Garantía en todos nuestros productos\n' +
      '✅ Repuestos originales\n' +
      '✅ Capacitación para uso de equipos\n' +
      '✅ Proyectos industriales a medida\n\n' +
      '¿Qué servicio necesitas?',
      'bot',
      [
        { id: 'ws1', label: '🔧 Servicio Técnico', action: 'whatsapp', data: 'servicio-tecnico' },
        { id: 'ws2', label: '📋 Cotizar Proyecto', action: 'whatsapp', data: 'proyecto' },
        { id: 'ws3', label: '🛠️ Repuestos', action: 'whatsapp', data: 'repuestos' },
        { id: 'back', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
      ]
    );
  };

  const showContactInfo = () => {
    addMessage(
      '📞 Información de Contacto:\n\n' +
      '📱 WhatsApp: +57 322 210 1885\n' +
      '📧 Email: info@xcp.com.co\n' +
      '🌐 Web: www.xcp.com.co\n\n' +
      '⏰ Horario de Atención:\n' +
      'Lunes a Viernes: 8:00 AM - 6:00 PM\n' +
      'Sábados: 8:00 AM - 1:00 PM\n\n' +
      '¿Quieres hablar con un asesor ahora?',
      'bot',
      [
        { id: 'wa', label: '📱 Contactar Asesor', action: 'whatsapp', data: 'contacto' },
        { id: 'back', label: '⬅️ Volver al Menú', action: 'menu', data: 'main' }
      ]
    );
  };

  const showMainMenu = () => {
    addMessage(
      '¿En qué más puedo ayudarte?',
      'bot',
      getMainMenuOptions()
    );
  };

  const handleWhatsAppRedirect = (topic: string) => {
    let message = 'Hola, me gustaría obtener más información sobre ';

    switch (topic) {
      case 'bombas':
        message += 'bombas sumergibles Tsurumi.';
        break;
      case 'herramientas':
        message += 'herramientas eléctricas profesionales.';
        break;
      case 'generadores':
        message += 'generadores y motores Honda.';
        break;
      case 'jardineria':
        message += 'equipos Stihl para jardinería.';
        break;
      case 'wd40':
        message += 'lubricantes WD-40.';
        break;
      case 'envio':
        message += 'costos de envío a mi ciudad.';
        break;
      case 'pago':
        message += 'formas de pago disponibles.';
        break;
      case 'credito':
        message += 'crédito empresarial.';
        break;
      case 'servicio-tecnico':
        message += 'servicio técnico y mantenimiento.';
        break;
      case 'proyecto':
        message += 'cotizar un proyecto industrial.';
        break;
      case 'repuestos':
        message += 'repuestos para equipos.';
        break;
      default:
        message = 'Hola, necesito información sobre productos XCP.';
    }

    addMessage(
      '¡Perfecto! Te estoy redirigiendo a WhatsApp para que hables con uno de nuestros asesores especializados. 📱',
      'bot'
    );

    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        addMessage(
          '¿Hay algo más en lo que pueda ayudarte?',
          'bot',
          getMainMenuOptions()
        );
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.chatBot}>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <span>🤖</span>
              </div>
              <div className={styles.headerText}>
                <h4>Asistente XCP</h4>
                <span className={styles.status}>
                  <span className={styles.statusDot}></span>
                  En línea
                </span>
              </div>
            </div>
            <button onClick={handleClose} className={styles.closeBtn}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>{message.text}</div>
                  {message.options && message.options.length > 0 && (
                    <div className={styles.messageOptions}>
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          className={styles.optionButton}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className={styles.chatFooter}>
            <p className={styles.footerText}>
              Powered by <strong>XCP</strong> - Equipos Industriales
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button onClick={handleOpen} className={styles.floatingButton}>
          <span className={styles.chatIcon}>💬</span>
          <span className={styles.pulse}></span>
        </button>
      )}
    </div>
  );
}
