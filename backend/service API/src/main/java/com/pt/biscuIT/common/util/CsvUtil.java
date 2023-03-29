package com.pt.biscuIT.common.util;

import com.pt.biscuIT.api.dto.content.FeedbackDto;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.time.LocalDate.now;

public class CsvUtil {

    public void writeCsvFile(FeedbackDto feedbackDto) throws IOException {
        String OS = System.getProperty("os.name").toLowerCase();
        String path = "";
        String sep = "";
        List<String> userDirList = null;
        if (OS.contains("win")) {
            userDirList = new ArrayList<>(Arrays.asList(System.getProperty("user.dir").split("\\\\")));
            sep = "\\";
        } else {
            userDirList = new ArrayList<>(Arrays.asList(System.getProperty("user.dir").split("/")));
            sep = "/";
        }
        userDirList.remove(userDirList.size() - 1);
        path = String.join(sep, userDirList);
        path = path + sep + "data" + sep + "feedback" + sep + now() + ".csv";

        writeCsvFile(path, feedbackDto);
    }

    public void writeCsvFile(String path, FeedbackDto feedbackDto) throws IOException {
        BufferedWriter bw = null;
        File file = new File(path);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            bw = new BufferedWriter(new FileWriter(file, true));
            bw.write(feedbackDto.toString());
            bw.newLine();
        } finally {
            try {
                if (bw != null) {
                    bw.flush();
                }
                bw.close();
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }


}
