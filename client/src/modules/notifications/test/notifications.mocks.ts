export const mockResponse = {
    limit: 10,
    page: 1,
    pages: 2,
    total: 20,
    docs: [{
        _id: "notif-id",
        user: "technician01 technician01",
        task: "My task",
        date: new Date(),
        read: true,
        createdAt: new Date()
    }]
}

export const mockNotification = mockResponse.docs[0]
