const notif_enums = {
    EVENT_CREATED: 'EVENT_CREATED',
    EVENT_UPDATED: 'EVENT_UPDATED',
    SUBSCRIPTION_REQ_REJECTED: 'SUBSCRIPTION_REQ_REJECTED'
}


const notif_types = {
    [notif_enums.EVENT_CREATED]: ({
        title,
        createdBy
    }) => {
        return {
            SUBJECT: 'New event created',
            CONTENT: `${createdBy} created a new event: ${title}`
        }
    },
    [notif_enums.EVENT_UPDATED]: ({
        title,
        createdBy
    }) => {
        return {
            SUBJECT: `Event updated`,
            CONTENT: `Event ${title} has been updated`
        }
    },
}

module.exports = {
    notif_enums,
    notif_types
}
