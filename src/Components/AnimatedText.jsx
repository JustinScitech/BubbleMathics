import React from 'react';
import {motion} from 'framer-motion'
const AnimatedText = ({sentence, styling}) => {
    const words = sentence.split(" ");
    const container = {
        hidden: {opacity: 0}, visible: (i = 1) => ({opacity: 1, transition: {staggerChildren: 0.12, delayChildren: 0.04*i}}),
    };
    const child = {
        hidden: {opacity: 0, y:20, transition: {type: "spring", damping: 10, stiffness: 120}},
        visible: {opacity:1, y:0, transition: {type: "spring", damping: 10, stiffness: 120}}
    }
    return(
        <motion.div className = "overflow-hidden flex break-all flex-wrap" variants = {container} initial = "hidden" animate = "visible">
            {words.map((word, index) => (
                <motion.span className = {styling} variants = {child}style={{marginRight: "5px"}} key= {index}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedText;