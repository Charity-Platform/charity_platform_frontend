import { useState } from 'react';
import './About.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react';

const TabsCustomAnimation = () => {
  const colors = useColorModeValue(
    ['#ffe6e6', '#e6f9f9', '#e6f0ff'],
    ['#660000', '#004d4d', '#000066'],
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <Tabs onChange={(index) => setTabIndex(index)} bg={bg} className="tabs-custom" dir="rtl">
      <TabList className="tab-list">
        <Tab className="tab"> تأسيس المشروع </Tab>
        <Tab className="tab">اهدافنا </Tab>
        <Tab className="tab">رؤيتنا  </Tab>
      </TabList>
      <TabPanels className="tab-panels" p="2rem" style={{}}>
        <TabPanel className="tab-panel">
            <ul className='list-of-plan'>
           <li> خلق أفكار وحلول للمشاريع</li>
           <li>  إعادة تأسيس وبناء الأعمال </li>
           <li> تحسين وتجديد هيكل الشركة لتعزيز الكفاءة. </li>
           </ul>
            </TabPanel>
        <TabPanel className="tab-panel">
            <ul className='list-of-plan'>
            <li>تعزيز كفاءة المؤسسات الخيرية: تحسين إدارة العمليات والموارد لضمان تحقيق الأهداف بأعلى مستويات الكفاءة.</li>
            <li>زيادة الوعي بالمشاريع الخيرية: تطوير استراتيجيات تسويقية لزيادة الوعي والدعم للمشاريع الخيرية.</li>
            <li>تعزيز كفاءة المؤسسات الخيرية: تحسين إدارة العمليات والموارد لضمان تحقيق الأهداف بأعلى مستويات الكفاءة.</li>
            <li>تنمية الموارد المالية: تطوير أساليب مبتكرة لجمع التبرعات وتنمية الموارد لدعم استدامة المشاريع الخيرية.</li>
            <li>تحقيق الشفافية والمساءلة: مساعدة المؤسسات الخيرية في تحقيق أعلى معايير الشفافية والمساءلة لضمان الثقة والدعم المستمر من المجتمع.</li>
           <li>تأهيل الكفاءات: المساهمة في تأهيل وتدريب الكفاءات الوطنية المتخصصة المرتبطة بالعمل الخيري والتطوعي.</li>
           <li>الاستدامة: تعزيز مفهوم الاستدامة وإدارة المعرفة في القطاع الخيري من خلال الشراكات الاستراتيجية.</li>
            </ul>
        </TabPanel>
        <TabPanel className="tab-panel">
            <ul className='list-of-plan'>
           <p>المنصة الرائدة في الكويت والعالم العربي لتقديم الدعم الشامل والمتخصص للمؤسسات الخيرية والأهلية، ومساعدتها في تطوير أدائها مما يسهم في تحقيق التنمية المستدامة وإحداث تأثير إيجابي واسع النطاق في المجتمع.</p>
           
           </ul>
            </TabPanel>
        <TabPanel className="tab-panel">Red, yellow and blue.</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsCustomAnimation;
