import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
 

const ChallengeStatement = ({description}) => {

    return (
        <div className="prose lg:prose-xl  dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
        </div>
      );
    
  
}

export default ChallengeStatement