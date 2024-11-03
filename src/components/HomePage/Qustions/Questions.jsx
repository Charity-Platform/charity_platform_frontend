import './Question.css';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';
  import { Box } from '@chakra-ui/react';
const Questions = () => {
   
  return (
    <div>
  
     <h1 className="heading w-2 p-5 text-center-instructor ">الأسئلة الشائعة </h1>
     
<Accordion className='Accordion' defaultIndex={[0]} allowMultiple >
  <AccordionItem className='AccordionItem'>
    <h2>
      <AccordionButton className='AccordionButton'>
        <Box as='span' flex='1' textAlign='center'p={8}>
        ما هي منصة استشارة؟
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel p={4} m={5} textAlign='center'>
    هي منصة إلكترونية مقدمة من جمعية استشارة للتنمية الاجتماعية وتُقدم خدمات الاستشارة للجمعيات الأهلية والخيرية.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem className='AccordionItem'> 
    <h2>
      <AccordionButton className='AccordionButton'>
        <Box as='span' flex='1' textAlign='center' p={3} m={2}>
        هل خدمات الاستشارة تُقدم بشكل مجاني وبدون مقابل؟
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel p={4} m={5} textAlign='center'>
     لا , ليس كل الاستشارات المقدمة ف المنصة تقدم بشكل مجانى وانما هناك بعض الاستشارات المجانية .
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem className='AccordionItem'> 
    <h2>
      <AccordionButton className='AccordionButton'>
        <Box as='span' flex='1' textAlign='center' p={3} m={2}>
        ما مدى الخصوصة المقدمة للمستشير؟
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel p={4} m={5} textAlign='center'>
    تقدم جميع استشاراتنا بخصوصية تامة.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
<div className='btn-more'>
      <button  className="btn-more-dir"> عرض الجميع </button>

      </div>
  </div>
)
 
}

export default Questions
