export class DictionaryUtils {
  static convertToUniDataPickerFormat(data) {
    return data.map(item => ({
      value: item.keyValue,
      text: item.dictValue,
      children: item.children ? this.convertToUniDataPickerFormat(item.children) : undefined
    }));
  }

  static convertToUniDataSelectFormat(data) {
    return data.map(item => ({
      value: item.keyValue,
      text: item.dictValue
    }));
  }

  static getDictionaryLabel(keyValue, options, isHierarchical = false) {
    if (!keyValue || !options || !options.length) return null;
    
    if (isHierarchical) {
      return this.getHierarchicalDictionaryLabel(keyValue, options);
    } else {
      const item = options.find(option => option.keyValue === keyValue);
      return item ? item.dictValue : null;
    }
  }

  static getHierarchicalDictionaryLabel(keyValue, options) {
    if (!options || !options.length) return null;
    
    const findLabel = (items, targetValue) => {
      for (const item of items) {
        if (item.keyValue === targetValue) {
          return item.dictValue;
        }
        if (item.children && item.children.length > 0) {
          const childLabel = findLabel(item.children, targetValue);
          if (childLabel) return childLabel;
        }
      }
      return null;
    };
    
    return findLabel(options, keyValue);
  }

  static findCascaderPath(data, targetValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    
    const findPath = (items, targets, currentPath = []) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const newPath = [...currentPath, item.value];
        
        if (item.value === targets[0]) {
          if (targets.length === 1) {
            return newPath;
          }
          
          if (item.children && item.children.length > 0) {
            const childPath = findPath(item.children, targets.slice(1), newPath);
            if (childPath) return childPath;
          }
        }
      }
      return null;
    };
    
    return findPath(data, targetValues);
  }

  static buildQueryParams(dictionaryOptions) {
    const params = {};
    Object.keys(dictionaryOptions).forEach(key => {
      if (dictionaryOptions[key] && dictionaryOptions[key].length > 0) {
        params[key] = JSON.stringify(dictionaryOptions[key]);
      }
    });
    return params;
  }

  static parseQueryParams(options) {
    const dictionaryOptions = {};
    const dictionaryKeys = [
      'carModel', 'projectType', 'projectPhase', 'faultClassification',
      'faultLocation', 'partCategory', 'spareLocation', 'partNumber',
      'feeType', 'repairItems'
    ];
    
    dictionaryKeys.forEach(key => {
      if (options[key]) {
        try {
          dictionaryOptions[key] = JSON.parse(decodeURIComponent(options[key]));
        } catch (error) {
          console.error(`解析字典参数失败 ${key}:`, error);
          dictionaryOptions[key] = [];
        }
      }
    });
    
    return dictionaryOptions;
  }
}
