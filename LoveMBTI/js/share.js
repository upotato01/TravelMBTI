function shareMessage(){    Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '당신의 연애 스타일',
    description: '상상만 해도 행복해지는 연인과의 데이트, 당신은 어떤 유형의 남친,여친 인가요?',
    imageUrl:'https://ibb.co/HrBRr3F',
    link: {
      mobileWebUrl: 'https://effulgent-dusk-ea9d72.netlify.app/',
      webUrl: 'https://effulgent-dusk-ea9d72.netlify.app/',
    },
  },
  buttons: [
    {
      title: '웹으로 보기',
      link: {
        mobileWebUrl: 'https://effulgent-dusk-ea9d72.netlify.app/',
        webUrl: 'https://effulgent-dusk-ea9d72.netlify.app/',
      },
    },
  ],
});
}