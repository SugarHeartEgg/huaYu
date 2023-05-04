/**
 * 遍历树节点
 * @param {Array} data 源数据
 * @param {function} callback 回调函数
 * @param {String} childrenName 子级节点名称
 * let result = foreachTree(data, (item) => {if (item.id === 9) {result = item}})  // {id: 9,label: "三级 1-1-1"}
 */
export const foreachTree = (
  data: Array<any>,
  callback: Function,
  childrenName: string = "children"
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i]);
    if (data[i][childrenName] && data[i][childrenName].length > 0) {
      foreachTree(data[i][childrenName], callback, childrenName);
    }
  }
};

/**
 * indexof方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export function fuzzyIndexOfQuery(
  list: Array<any>,
  keyWord: string
): Array<any> {
  let arr: Array<any> = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].indexOf(keyWord) >= 0) {
      arr.push(list[i]);
    }
  }
  return arr;
}

/**
 * tree 模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param {String} childrenName 子级节点名称
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export function matchTreeData(
  arr: any[],
  searchCon: any,
  childrenName: string = "children"
): any[] {
  let newArr: any[] = [];
  let searchNameList = ["name"];

  arr.forEach((item: any) => {
    for (let i = 0, len = searchNameList.length; i < len; i++) {
      let nameKey = searchNameList[i];

      if (item.hasOwnProperty(nameKey)) {
        if (item[nameKey] && item[nameKey].indexOf(searchCon) !== -1) {
          newArr.push(item);
          break;
        } else {
          if (item[childrenName] && item[childrenName].length > 0) {
            let resultArr = matchTreeData(item[childrenName], searchCon);
            
            if (resultArr && resultArr.length > 0) {
              newArr.push({
                ...item,
                [childrenName]: resultArr,
              });
              break;
            }
          }
        }
      } else {
        continue;
      }
    }
  });

  return newArr;
}
