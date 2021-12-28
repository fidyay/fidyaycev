import workingWithDuration from './functions/workWithSongDuration.js'

test('206s to equal 03:26', () => {
    expect(workingWithDuration(206)).toBe('03:26');
  });

test('519s to equal 08:39', () => {
    expect(workingWithDuration(519)).toBe('08:39');
  });

  test('3600s to equal 01:00:00', () => {
    expect(workingWithDuration(3600)).toBe('01:00:00');
  });
  test('7200s to equal 02:00:00', () => {
    expect(workingWithDuration(7200)).toBe('02:00:00');
  });

  test('72000s to equal 20:00:00', () => {
    expect(workingWithDuration(72000)).toBe('20:00:00');
  });
  test('720000s to equal 200:00:00', () => {
    expect(workingWithDuration(720000)).toBe('200:00:00');
  });
  test('720121s to equal 200:02:01', () => {
    expect(workingWithDuration(720121)).toBe('200:02:01');
  });
  test('721451s to equal 200:24:11', () => {
    expect(workingWithDuration(721451)).toBe('200:24:11');
  });