const App = new Vue({
	el: '#article',
	data: {
			filterForArticles: 'all',

			allArticles: [

				{
					title: 'Роспись по одежде: рассказываем, как и для кого',
					firstText: 'Как часто вы приходили в магазин, выбирали вещь, но не приобретали её, потому что вам не нравился рисунок?',
					fileNameOfImage: 'xudozh_stat1',
					imageDescription: 'Я описание картинки',
					link: 'xudozh_mk.html'
				},
				
				{
					title: 'Идеальный корпоратив: от идеи до реализации',
					firstText: 'Идеальный корпоратив для вашей организации – какой он? Рассказываем, как удивить своих сотрудников и сделать из них сплоченный коллектив.',
					fileNameOfImage: 'korporat1',
					imageDescription: 'Идеальный корпоратив: от идеи до реализации',
					link: 'korporat1.html'
				},
				
				{
					title: 'Оригинальный декор интерьера',
					firstText: 'Как создать стильный и уникальный дизайн у себя дома?',
					fileNameOfImage: 'ramka5',
					imageDescription: 'Оригинальный декор интерьера',
					link: 'dekor-interiera.html'
				},
				
				{
					title: 'Творческий корпоратив: что вам может предложить TIME TO TALK?',
					firstText: 'Корпоратив - дело серьёзное. Если копнуть глубже, то суть организации развлекательного мероприятия заключается в продуманной схеме, которая должна сплотить ваш коллектив и показать сотрудникам, что ваша организация не просто место работы, а место самореализации для каждого члена команды.',
					fileNameOfImage: 'format1',
					imageDescription: 'Творческий корпоратив: что вам может предложить TIME TO TALK?',
					link: 'format-meropriyatiya.html'
				},
				
				{
					title: 'TIME TO TALK: как все начиналось?',
					firstText: 'TIME TO TALK - это объединение нескольких площадок для проведения мероприятий разного формата, среди которых могут быть корпоративы, мастер-классы, экскурсии, выступления творческих людей или практикумы. Но есть одна особенность, объединяющая эти мероприятия - любовь к искусству.',
					fileNameOfImage: 'history4',
					imageDescription: 'TIME TO TALK: как все начиналось?',
					link: 'nachalo.html'
				},
				
				{
					title: 'Как правильно организовать мероприятие?',
					firstText: 'Лучшее качество за меньшую стоимость: как правильно организовать мероприятие, чтобы не переплачивать',
					fileNameOfImage: 'pravilo_organiz4',
					imageDescription: 'Как правильно организовать мероприятие?',
					link: 'pravilo_organiz.html'
				},
				
				{
					title: '6 основных критериев качественной организации мероприятия',
					firstText: 'Организация мероприятия – сложный и ответственный процесс, который требует необходимых навыков и усилий',
					fileNameOfImage: '6kachestvo_organiz8',
					imageDescription: '6 основных критериев качественной организации мероприятия',
					link: '6kachestvo_organiz.html'
				},


			],

			popularArticles: [

				{
					title: 'Идеальный корпоратив: от идеи до реализации',
					fileNameOfImage: 'g1',
					imageDescription: 'Идеальный корпоратив: от идеи до реализации',
					category: 'masterClass',
					link: 'korporat1.html'
				},

				{
					title: 'Роспись по одежде: рассказываем, как и для кого',
					fileNameOfImage: 'xudozh_stat1',
					imageDescription: 'мастер класс по росписи на одежде',
					category: 'masterClass',
					link: 'xudozh_mk.html'
				},
				
				{
					title: 'Оригинальный декор интерьера',
					fileNameOfImage: 'ramka5',
					imageDescription: 'Оригинальный декор интерьера',
					category: 'masterClass',
					link: 'dekor-interiera.html'
				},
				
				{
					title: 'Творческий корпоратив: что вам может предложить TIME TO TALK?',
					fileNameOfImage: 'format1',
					imageDescription: 'Творческий корпоратив: что вам может предложить TIME TO TALK?',
					category: 'masterClass',
					link: 'format-meropriyatiya.html'
				},
				
				{
					title: 'TIME TO TALK: как все начиналось?',
					fileNameOfImage: 'history4',
					imageDescription: 'TIME TO TALK: как все начиналось?',
					category: 'masterClass',
					link: 'nachalo.html'
				},
				
				{
					title: 'Как правильно организовать мероприятие?',
					fileNameOfImage: 'pravilo_organiz4',
					imageDescription: 'Как правильно организовать мероприятие?',
					category: 'masterClass',
					link: 'pravilo_organiz.html'
				},
				
				{
					title: '6 основных критериев качественной организации мероприятия',
					fileNameOfImage: '6kachestvo_organiz8',
					imageDescription: '6 основных критериев качественной организации мероприятия',
					category: 'masterClass',
					link: '6kachestvo_organiz.html'
				},

			],

			readMore: [

				{
					title: 'Роспись по одежде: рассказываем, как и для кого',
					firstText: 'Как часто вы приходили в магазин, выбирали вещь, но не приобретали её, потому что вам не нравился рисунок?',
					fileNameOfImage: 'xudozh_stat1',
					imageDescription: 'мастер класс по росписи на одежде',
					link: 'xudozh_mk.html'
				},
				
				{
					title: 'Как правильно организовать мероприятие?',
					firstText: 'Лучшее качество за меньшую стоимость: как правильно организовать мероприятие, чтобы не переплачивать',
					fileNameOfImage: 'pravilo_organiz4',
					imageDescription: 'Как правильно организовать мероприятие?',
					link: 'pravilo_organiz.html'
				},

				{
					title: 'Идеальный корпоратив: от идеи до реализации',
					firstText: 'Идеальный корпоратив для вашей организации – какой он? Рассказываем, как удивить своих сотрудников и сделать из них сплоченный коллектив.',
					fileNameOfImage: 'g1',
					imageDescription: 'Идеальный корпоратив: от идеи до реализации',
					link: 'korporat1.html'
				},
				
				{
					title: 'Оригинальный декор интерьера',
					firstText: 'Как создать стильный и уникальный дизайн у себя дома?',
					fileNameOfImage: 'ramka5',
					imageDescription: 'Оригинальный декор интерьера',
					link: 'dekor-interiera.html'
				},
				
				{
					title: 'Творческий корпоратив: что вам может предложить TIME TO TALK?',
					firstText: 'Корпоратив - дело серьёзное. Если копнуть глубже, то суть организации развлекательного мероприятия заключается в продуманной схеме, которая должна сплотить ваш коллектив и показать сотрудникам, что ваша организация не просто место работы, а место самореализации для каждого члена команды.',
					fileNameOfImage: 'format1',
					imageDescription: 'Оригинальный декор интерьера',
					link: 'format-meropriyatiya.html'
				},
				
				{
					title: 'TIME TO TALK: как все начиналось?',
					firstText: 'TIME TO TALK - это объединение нескольких площадок для проведения мероприятий разного формата, среди которых могут быть корпоративы, мастер-классы, экскурсии, выступления творческих людей или практикумы. Но есть одна особенность, объединяющая эти мероприятия - любовь к искусству.',
					fileNameOfImage: 'history4',
					imageDescription: 'TIME TO TALK: как все начиналось?',
					link: 'nachalo.html'
				},
				
				{
					title: '6 основных критериев качественной организации мероприятия',
					firstText: 'Организация мероприятия – сложный и ответственный процесс, который требует необходимых навыков и усилий',
					fileNameOfImage: '6kachestvo_organiz8',
					imageDescription: '6 основных критериев качественной организации мероприятия',
					link: '6kachestvo_organiz.html'
				},



			],
		}
	})

