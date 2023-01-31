
class DataGridHandler {
    
    constructor() {
    }

    static instance = new DataGridHandler();

    sortHadnler = (sortModel) => {
        let result = {}
        sortModel && sortModel.forEach(query => {
            if (!this.nullOrEmpty(query.field) && query.sort) {
                result[query.field] = query.sort == 'asc' ? 1 : -1
            }
        })
        return result
    }

    filterHandler = (filterModel) => {
        let result = {}
        filterModel && filterModel.forEach(field => {
            const columnField = field.columnField.replace('.displayName', '.firstname')
            switch (field.operatorValue) {

                case 'contains':
                    result[columnField] = {
                        "$regex": field.value,
                        "$options": "i"
                    }
                    break;
                case 'equals':
                    result[columnField] = field.value
                    break;
                case 'startsWith':
                    result[columnField] = {
                        "$regex": `^${field.value}`,
                        "$options": "i"
                    }
                    break;
                case 'endsWith':
                    result[columnField] = {
                        "$regex": `${field.value}$`,
                        "$options": "i"
                    }
                    break;
                case 'is':
                    result[columnField] = field.value
                    break;
                case 'not':
                    result[columnField] = { "$ne": field.value }
                    break;
                case 'after':
                    result[columnField] = { "$gt": field.value }
                    break;
                case 'onOrAfter':
                    result[columnField] = { "$gte": field.value }
                    break;
                case 'before':
                    result[columnField] = { "$lt": field.value }
                    break;
                case 'onOrBefore':
                    result[columnField] = { "$lte": field.value }
                    break;
            }
        });
        return result;
    }

    nullOrEmpty = (data) => {
        return !data || data.trim() == ""
    }
}

module.exports = DataGridHandler.instance;