const randomInt = (min, max) => {
    if(max === min) {
        return min;
    }
    const range = (max > min ? (max - min) : (min - max)) + 1;
    return Math.floor(Math.random() * range) + min;
};
  
const randomBool = () => {
    return randomInt(0, 1) > 0;
};

export {randomInt, randomBool};