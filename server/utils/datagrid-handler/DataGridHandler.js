
class DataGridHandler {
    instance;

    constructor() {
    }

    static createInstance() {
        return new DataGridHandler()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

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
            const value = field.value.replace('.displayName', '.firstname')
            switch (field.operatorValue) {

                case 'contains':
                    result[field.columnField] = {
                        "$regex": value,
                        "$options": "i"
                    }
                    break;
                case 'equals':
                    result[field.columnField] = value
                    break;
                case 'startsWith':
                    result[field.columnField] = {
                        "$regex": `^${value}`,
                        "$options": "i"
                    }
                    break;
                case 'endsWith':
                    result[field.columnField] = {
                        "$regex": `${value}$`,
                        "$options": "i"
                    }
                    break;
                case 'is':
                    result[field.columnField] = value
                    break;
                case 'not':
                    result[field.columnField] = { "$ne": value }
                    break;
                case 'after':
                    result[field.columnField] = { "$gt": value }
                    break;
                case 'onOrAfter':
                    result[field.columnField] = { "$gte": value }
                    break;
                case 'before':
                    result[field.columnField] = { "$lt": value }
                    break;
                case 'onOrBefore':
                    result[field.columnField] = { "$lte": value }
                    break;
            }
        });
        return result;
    }

    nullOrEmpty = (data) => {
        return !data || data.trim() == ""
    }
}

module.exports = DataGridHandler.getInstance();