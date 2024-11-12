import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './CardServices.css';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/6.jpeg';
import img4 from '../../assets/11.jpeg';
import img5 from '../../assets/10.jpeg';
import img6 from '../../assets/5.jpeg';
import img7 from '../../assets/6.jpeg';
import img8 from '../../assets/8.jpeg'; // Added new images for other services
import img9 from '../../assets/9.jpeg';
import img10 from '../../assets/10.jpeg';
import img11 from '../../assets/11.jpeg';

// بيانات الخدمات
const servicesData = [
    {
        id: 1,
        title: "تأسيس وبناء الجمعيات الخيرية",
        description: "نوفر استشارات لبناء جمعيات خيرية فعالة.",
        image: img1,
        points: [
            "إعداد دراسة جدوى المؤسسة وتحليل احتياجات المجتمع لها",
            "إعداد المستندات وتسهيل الاجراءات القانونية المطلوبة للتأسيس",
            "تحديد أهداف ورؤية ورسالة المؤسسة",
            "تصميم هيكل تنظيمي فعال",
            "إعداد السياسات واللوائح الداخلية للمؤسسة"
        ]
    },
    {
        id: 2,
        title: "إدارة المشاريع الخيرية",
        description: "نقدم استشارات لإدارة المشاريع الخيرية بنجاح.",
        image: img2,
        points: [
            "إدارة المشاريع الخيرية",
            "إعداد خطة المشاريع السنوية للمؤسسة وفقاً لأهدافها وخطتها الاستراتيجية",
            "دعم المؤسسة في تبني أفضل الممارسات في إدارة مشاريعها الخيرية"
        ]
    },
    {
        id: 3,
        title: "التسويق وبناء الهوية (فريق تسويقي متخصص)",
        description: "نقدم خدمات تسويقية لبناء هوية المؤسسة الخيرية.",
        image: img3,
        points: [
            "خلق وبناء علامة تجارية للمؤسسة الخيرية ونشر الوعي حول خدماتها",
            "تصميم استراتيجيات تسويق الرقمي لزيادة التفاعل والدعم",
            "تحسين تواجد المؤسسة على وسائل التواصل الاجتماعي",
            "تصميم حملات تسويقية لجذب التبرعات"
        ]
    },
    {
        id: 4,
        title: "التخطيط الاستراتيجي",
        description: "نساعد في وضع وتطوير خطط استراتيجية شاملة.",
        image: img4,
        points: [
            "بناء وتطوير الرؤية والرسالة للمؤسسة",
            "تحديد الأهداف الاستراتيجية طويلة وقصيرة الأجل",
            "وضع الخطة (الاستراتيجية - التشغيلية - التنفيذية) للمؤسسة"
        ]
    },
    {
        id: 5,
        title: "التخطيط المالي والميزانيات",
        description: "توفير خدمات تخطيط مالي وإعداد ميزانيات دقيقة.",
        image: img5,
        points: [
            "التخطيط المالي والميزانية",
            "تخصيص الموارد المالية لتحقيق الأهداف",
            "إعداد ميزانيات تفصيلية تتماشى مع الخطة الاستراتيجية"
        ]
    },
    {
        id: 6,
        title: "إدارة الجودة وتحسين الأداء",
        description: "تقييم وتطوير نظم إدارة الجودة لضمان الأداء الفعال.",
        image: img6,
        points: [
            "تقييم شامل لنظم إدارة الجودة الحالية",
            "تطوير وتحسين نظم إدارة الجودة وتقييم الأداء للمؤسسة",
            "الرقابة والمراجعة والتدقيق الدوري وإعداد تقارير الجودة",
            "توصيات لتحسين كفاءة العمليات الإدارية والتشغيلية",
            "تطوير نظم إدارة الموارد البشرية"
        ]
    },
    {
        id: 7,
        title: "الامتثال والحوكمة وإدارة المخاطر",
        description: "نوفر حلول لتحقيق الامتثال والحوكمة وإدارة المخاطر.",
        image: img7,
        points: [
            "وضع معايير الشفافية والمساءلة لضمان النزاهة",
            "توجيه المؤسسة حول أفضل الممارسات في الحوكمة والشفافية",
            "تطوير سياسات وإجراءات الحوكمة للمؤسسة",
            "تحديد المخاطر وتصميم استراتيجيات للحد منها"
        ]
    },
    {
        id: 8,
        title: "تحديد المخاطر وتصميم استراتيجيات للحد منها",
        description: "نساعد في تقليل المخاطر وتوفير استراتيجيات فعّالة.",
        image: img8,
        points: [
            "خلق وبناء علامة تجارية للمؤسسة الخيرية ونشر الوعي حول خدماتها",
            "تصميم استراتيجيات تسويق الرقمي لزيادة التفاعل والدعم",
            "تحسين تواجد المؤسسة على وسائل التواصل الاجتماعي",
            "تصميم حملات تسويقية لجذب التبرعات"
        ]
    },
    {
        id: 9,
        title: "تنمية الموارد المالية",
        description: "نوفر استراتيجيات مبتكرة لتنمية الموارد المالية.",
        image: img9,
        points: [
            "تطوير استراتيجيات لجذب التمويل والتبرعات",
            "تطوير برامج لبناء شراكات مع المانحين"
        ]
    },
    {
        id: 10,
        title: "التدريب والتطوير",
        description: "نوفر برامج تدريبية لتعزيز مهارات العاملين.",
        image: img10,
        points: [
            "تقدير الاحتياج للمؤسسة من البرامج التدريبية",
            "تصميم خطة تدريبية لموظفي المؤسسة حسب الحاجة",
            "توفير أفضل البرامج التدريبية لتنمية مهارات العاملين في المؤسسة الخيرية"
        ]
    },
    {
        id: 11,
        title: "العلاقات العامة والتواصل وبناء الشراكات",
        description: "تطوير استراتيجيات للتواصل وبناء الشراكات الفعّالة.",
        image: img11,
        points: [
            "تطوير خطط إعلامية لتعزيز حضور المؤسسة إعلامياً",
            "تصميم استراتيجية بناء سمعة إيجابية وإدارة الأزمات الإعلامية",
            "تطوير محتوى إعلامي إبداعي يعكس رؤية المؤسسة وأهدافها",
            "تطوير استراتيجيات للتفاعل مع الجمهور المستهدف وتعزيز العلاقة معه",
            "تطوير استراتيجيات للتواصل الفعّال مع الجهات الداعمة والشركاء"
        ]
    }
];

const Card = () => {
    const { serviceId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalService, setModalService] = useState(null);

    const handleShowModal = (service) => {
        setModalService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalService(null);
    };

    if (serviceId) {
        const service = servicesData.find((service) => service.id.toString() === serviceId);
        if (!service) {
            return <div>الخدمة غير موجودة</div>;
        }
        return (
            <div className="card-service-container">
                <div className="service-card">
                    <div className="service-image-container">
                        <img src={service.image} alt={service.title} className="service-image" />
                    </div>
                    <div className="service-card-content">
                        <h2 className="service-title">{service.title}</h2>
                        <p className="service-description">{service.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card-services-container">
            <div className="services-list">
                {servicesData.map((service) => (
                    <div key={service.id} className="service-card">
                        <div className="service-image-container">
                            <img src={service.image} alt={service.title} className="service-image" />
                        </div>
                        <div className="service-card-content">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <button onClick={() => handleShowModal(service)} className="btn btn-primary">
                                تفاصيل الخدمة
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for service points */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalService?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {modalService?.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        إغلاق
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Card;
