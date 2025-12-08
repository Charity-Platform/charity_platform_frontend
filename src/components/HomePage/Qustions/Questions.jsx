import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { retryApiCall } from '../../../api/apiHelpers';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchQuestions = async () => {
      try {
        console.log('📥 Fetching questions...');
        const response = await retryApiCall(
          () => axios.get('questions'),
          3
        );
        
        const data = response.data.document;

        if (isMounted) {
          if (data && data.length > 0) {
            console.log(`✅ Loaded ${data.length} questions`);
            setQuestions(data);
          } else {
            console.log('⚠️ No questions found');
            setQuestions([]);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Error fetching questions:', error);
        if (isMounted) {
          setError('حدث خطأ أثناء جلب الأسئلة. حاول مرة أخرى.');
          setLoading(false);
        }
      }
    };

    fetchQuestions();
    
    return () => {
      isMounted = false;
      console.log('🧹 Cleanup: Questions component unmounted');
    };
  }, []);

  return (
    <div>
      <h1 className="heading w-2 p-5 text-center-instructor">الأسئلة الشائعة</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {questions.length === 0 && !error && (
        <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>
          لا توجد أسئلة متوفرة حالياً.
        </p>
      )}

      {questions.length > 0 && (
        <Accordion className="Accordion" defaultIndex={[0]} allowMultiple>
          {questions.map((item) => (
            <AccordionItem key={item._id} className="AccordionItem">
              <h2>
                <AccordionButton className="AccordionButton">
                  <Box as="span" flex="1" textAlign="center" p={3} m={2}>
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={4} m={5} textAlign="center">
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Questions;
