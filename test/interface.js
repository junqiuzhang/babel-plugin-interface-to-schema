interface IGrandFather {
  gra: number; // GrandFather

}
interface IFather extends IGrandFather {
  fat: number; // Father

}
interface IProps extends IFather {
  son: Array<number>; // Son

}
