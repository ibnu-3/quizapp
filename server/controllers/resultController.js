export const createResult=async (req,res) => {
    try {
        const {title, technology, level,correctAnswers, wrongAnswers, totalQuestions}=req.body;
        if(!title || !level || totalQuestions===undefined ){}

    } catch (error) {
        
    }
}