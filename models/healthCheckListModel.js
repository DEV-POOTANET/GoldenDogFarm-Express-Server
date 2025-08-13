class HealthCheckList {
    constructor({ hCL_ID, hCL_Name, hCL_Description, hCL_Status }) {
        this.hCL_ID = hCL_ID;
        this.hCL_Name = hCL_Name;
        this.hCL_Description = hCL_Description;
        this.hCL_Status = hCL_Status;
    }

    getHealthCheckList() {
        return {
            id: this.hCL_ID,
            name: this.hCL_Name,
            description: this.hCL_Description,
            status: this.hCL_Status
        };
    }

    disable() {
        this.hCL_Status = '2';
    }
}

module.exports = HealthCheckList;
