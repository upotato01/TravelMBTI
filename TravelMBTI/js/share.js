function shareMessage(){    Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '당신의 여행 스타일',
    description: '상상만 해도 행복해지는 여행일정, 당신은 어떤 유형의 여행자인가요?',
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