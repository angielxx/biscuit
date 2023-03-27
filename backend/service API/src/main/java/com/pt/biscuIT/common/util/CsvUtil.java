package com.pt.biscuIT.common.util;

import javax.imageio.IIOException;
import java.io.*;
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
        return sb.toString();
    }

    public void writeCsvFile(String[] data) {
        String OS = System.getProperty("os.name").toLowerCase();
        String path = "";
        if (OS.indexOf("win") >= 0) {
            List<String> userDirList = Arrays.asList(System.getProperty("user.dir").split("\\\\"));
            userDirList.remove(userDirList.size() - 1);
            path = String.join("\\", userDirList);
            path = path + "\\data\\feedback\\" + now() + ".csv";
        } else {
            List<String> userDirList = Arrays.asList(System.getProperty("user.dir").split("/"));
            userDirList.remove(userDirList.size() - 1);
            path = String.join("/", userDirList);
            path = path + "/data/feedback/" + now() + ".csv";
        }
        writeCsvFile(path, data);
    }

    public void writeCsvFile(String path, String[] data) {
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(path, true));
            bw.write(writeCsv(data));
            bw.newLine();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
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
