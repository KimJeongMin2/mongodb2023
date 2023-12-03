const faker = require('faker');
const fs = require('fs');
const Lodging = require('./models/Lodging');

function generateLodging() {
    const convenienceMap = {
        basic: ['화장지', '비누', '수건1장'],
        popular: ['수영장', '와이파이', '주방', '무료 공간'],
        safety: ['일산화탄소 경보기', '화재경보기', '소화기'],
        accessibility: ['계단이나 단차가 없는 현관', '폭 32인치/81cm 이상의 넓은 출입구']
    };

    const randomConvenienceKey = faker.random.arrayElement(Object.keys(convenienceMap));
    const type = faker.random.arrayElement(['전체 공간', '개인실']);
    const capacity = faker.random.number({ min: 1, max: 10 });
    const rooms = type === '개인실' ? capacity : undefined;
    const lodging = new Lodging({
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        type: type,
        capacity: capacity,
        rooms: rooms,
        introduction: faker.lorem.paragraph(),
        convenience: {
            [randomConvenienceKey]: convenienceMap[randomConvenienceKey]
        },
        weekdayFee: Math.floor(faker.random.number({ min: 50000, max: 200000 }) / 100) * 100,
        weekendFee: Math.floor(faker.random.number({ min: 70000, max: 250000 }) / 100) * 100,

    });

    return lodging;
}

module.exports = { generateLodging };
