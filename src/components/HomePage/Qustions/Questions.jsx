import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Question.css';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}questions`);
        setQuestions(response.data.document);  // Assuming response structure
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError('حدث خطأ أثناء جلب الأسئلة. حاول مرة أخرى.');
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1 className="heading w-2 p-5 text-center-instructor">الأسئلة الشائعة</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Accordion className='Accordion' defaultIndex={[0]} allowMultiple>
        {questions.map((item) => (
          <AccordionItem key={item._id} className='AccordionItem'>
            <h2>
              <AccordionButton className='AccordionButton'>
                <Box as='span' flex='1' textAlign='center' p={3} m={2}>
                  {item.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={4} m={5} textAlign='center'>
              {item.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <div className='btn-more'>
        <button className="btn-more-dir">عرض الجميع</button>
      </div> */}
    </div>
  );
};

export default Questions;
