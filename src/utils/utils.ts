export const getPropByPath = (obj: any, path: any) => {
  let tempObj = obj;
  path = path.replace(/\[(\w+)]/g, ".$1");
  path = path.replace(/^\./, "");
  let keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error("[MUi]: please transfer a valid prop path to form item!");
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  };
};

export const oneOf = (value: string, validList: string[]) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
};
