export function getRandomBillboard(billboardCount: number, billboardsIds:string[] ) {
  const randomIndex = Math.floor(Math.random() * billboardCount);
  return billboardsIds[randomIndex];
};