package service.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.app.domain.StudentModel;
import service.app.domain.TeacherModel;
import service.app.service.LogService;
import service.app.service.MyStuService;
import service.app.service.TeacherService;
import service.app.tramodel.BaseRequest;
import service.app.tramodel.RegRequest;
import service.app.tramodel.response.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class RegController {

    @Autowired
    MyStuService myStuService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    LogService logs;

    @RequestMapping("/reg")
    @ResponseBody
    public BaseResponse registerController(HttpServletRequest request,@RequestBody RegRequest data)
    {
        //System.out.println(data.toString());
        RegResponse response = new RegResponse();
        if(data.getUsername().length()==9)
        {
            Integer first = Integer.parseInt(data.getFirst());
            Integer second = Integer.parseInt(data.getSecond());
            String degree = data.getDegree();
//            Integer first = teacherService.getTeacherId(firstName);
//            Integer second = teacherService.getTeacherId(secondName);
            String tel = data.getTel();
            String email = data.getEmail();
            String direction = data.getDirection();
            String team = data.getTeam();
            //System.out.print(data.toString());
            if(myStuService.addStu(data.getUsername(),data.getPassword(),data.getName(),first,second,Integer.valueOf(degree),
                                        tel,email,direction,team))
            {
                StudentModel studentModel = logs.getStudentService(data.getUsername());
                //System.out.println("!!!");
                response.setErrCode(ErrCode.REG_OK);
                response.setStudentModel(studentModel);
                response.getStudentModel().setPassword("");
                response.setType(2);
            }
            else response.setErrCode(ErrCode.REG_ERR);
        }
        else if(data.getUsername().length()== 5)
        {
            String team = data.getTeam();
            String email = data.getEmail();
            String tel = data.getTel();
            String title = data.getTitle();
            String direction = data.getDirection();
            String link = data.getLink();
            if(teacherService.addTeacher(data.getUsername(),data.getPassword(),data.getName(),team,email,
                    title,tel,direction,link))
            {
                TeacherModel teacherModel = logs.getTeacherService(data.getUsername());
                response.setErrCode(ErrCode.REG_OK);
                response.setTeacherModel(teacherModel);
                response.getTeacherModel().setPassword("");
                response.setType(1);
            }
            else response.setErrCode(ErrCode.REG_ERR);
        }
        else
            response.setErrCode(ErrCode.REG_ERR);
        if(response.getErrCode()==ErrCode.REG_OK)
            response.setToken(logs.createToken(data.getUsername()));
        return response;
    }

    @GetMapping("/getTeacherName")
    @ResponseBody
    public List<TeacherRespose> getTeacherName()
    {
        List<TeacherRespose> resp = new ArrayList<TeacherRespose>();
        List<TeacherModel> tModel = teacherService.getTeacherName();

        for(int i=0; i<tModel.size(); i++)
        {
            TeacherRespose t = new TeacherRespose();
            t.setLabel(tModel.get(i).getName());
            t.setValue(tModel.get(i).getId().toString());
            resp.add(t);
        }
        return resp;
    }

}
