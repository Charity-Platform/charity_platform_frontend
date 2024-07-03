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
        
      </TabList>
      <TabPanels className="tab-panels" p="2rem">
        <TabPanel className="tab-panel">
            <ul className='list-of-plan'>
           <li> خلق أفكار وحلول للمشاريع</li>
           <li>  إعادة تأسيس وبناء الأعمال </li>
           <li> تحسين وتجديد هيكل الشركة لتعزيز الكفاءة. </li>
           </ul>
            </TabPanel>
        <TabPanel className="tab-panel">
            <ul className='list-of-plan'>
            <li>تحسين قنوات التواصل بين الجمعيات الخيرية والمستفيدين لضمان تلبية احتياجاتهم بفعالية.</li>
            <li>إجراء تقييمات دورية لبرامج الجمعيات لضمان تحقيق الأهداف المرجوة وتحسين الأداء.</li>
            <li>نشر الوعي حول أهمية العمل الخيري وتحفيز المجتمع على المشاركة الفعالة.</li>
            </ul>
        </TabPanel>
        <TabPanel className="tab-panel">Red, yellow and blue.</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsCustomAnimation;
