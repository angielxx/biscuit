package com.pt.biscuIT.common.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.time.LocalDate.now;

public class CsvUtil {
    private String writeCsv(String[] data) {
        StringBuilder sb = new StringBuilder();
        for (String s : data) {
            sb.append(s);
            sb.append(",");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    public void writeCsvFile(String[] data) {
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

        writeCsvFile(path, data);
    }

    public void writeCsvFile(String path, String[] data) {
        BufferedWriter bw = null;
        File file = new File(path);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            bw = new BufferedWriter(new FileWriter(file, true));
            bw.write(writeCsv(data));
            bw.newLine();
        } catch (IOException e) {
            e.printStackTrace();
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
