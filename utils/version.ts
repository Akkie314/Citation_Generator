export default function isMajorMinorUpdate(prev:string, current:string):boolean {
    const [prevMajor, prevMinor] = prev.split('.').map(Number);
    const [currMajor, currMinor] = current.split('.').map(Number);

    // メジャー、マイナーに差があるか
    return prevMajor !== currMajor || prevMinor !== currMinor;
}