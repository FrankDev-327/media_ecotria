module.exports = {
    currentDate: async () => {
        var timeObject = new Date();
        timeObject.setHours(timeObject.getHours() - 5);
        return timeObject;
    }
}