package com.hackathon.koscom.team1.dto.gpt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GptResponse {

    private String s1 = "요약:";
    private String s2 = "당사는 이천시에 본사를 두고 있으며, 글로벌 반도체 기업으로 국내와 해외에 생산기지와 연구개발법인, 판매법인 및 사무소를 보유하고 있다.";
    private String s3 = "주력 제품은 DRAM과 NAND를 중심으로 하는 메모리반도체이며, 일부 Fab에서는 CIS와 파운드리사업도 수행한다.";
    private String s4 = "생산시설은 국내와 중국에 위치하며, 국내에서는 이천과 청주에, 중국에서는 우시와 대련에 생산시설이 있다.";
    private String s5 = "2022년 매출은 44조 6,216억원으로 상승했으며, 2021년과 2020년에 비해 계속해서 성장하고 있다.";
}
