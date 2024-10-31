// import faq from '@/data/faq.json'

// export const faqContent = [];

// for (let index = 0; index < faq.length; index++) {
//     const section = faq[index];
//     faqContent.push({
//         title: section.title,
//         questions: section.questions.map((question) => 
//             return {
//                 sec
//             }
//         )
//     })
// }
import faq from '@/data/faq.json'; // adjust path as needed
import html from 'remark-html';
import { remark } from 'remark';

let faqCache;

async function FAQ() {
    faqCache = await Promise.all(
        faq.map(async (section) => ({
                    ...section,
                    questions: await Promise.all(
                    section.questions.map(async (question) => ({
                    ...question,
                    answer: (await remark().use(html).process(question.answer)).toString(),
                }))
            ),
        }))
    );
}

export function GetFAQData()
{
    return faqCache;
}

FAQ();