export default function shuffle(array) {
    if (!array) return
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
 
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}