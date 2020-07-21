interface IFather {
  name: string; // Father
}
interface IChild {
  name: string;
}
interface IProps extends IFather {
  boo: boolean; // boolean
  num: number; // number
  str: string; // string
  obj: object; // object
  obj2: {
    child: IChild;
  };
  arr: Array<boolean>; // Array
  arr2: Array<IChild>;
  arr3: Array<{
    child: IChild;
  }>;
  fun: Function; // Function
  fun2: (n: number) => void;
  child: IChild;
}
