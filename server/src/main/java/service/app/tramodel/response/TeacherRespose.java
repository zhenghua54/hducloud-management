package service.app.tramodel.response;

public class TeacherRespose extends BaseResponse {

    //tearcherName
    private String label;
    //teacherId
    private String value;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
