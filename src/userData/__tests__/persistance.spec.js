import UserDataPersistance from '../persistance'

describe('- UserDataPersistance Class Testing', () => {
  const userDataPersistance = new UserDataPersistance()
  const mockAddress = '69629acdd3411b789b45a00499831e92db71feb7caa95e21774cca318ff25608'
  const mockBalance = 100
  const mockMnemonic = 'harbor share video lumber pizza mad dynamic there worth loud claw film inner marble citizen spawn acquire access sustain hip visit topic stairs celery;1'

  test('should get initial variables successful', (done) => {
    expect(userDataPersistance.userAddress).toBe('')
    expect(userDataPersistance.balance).toBe('')
    expect(userDataPersistance.mnemonic).toBe('')
    done()
  })

  test('should update variables successful', (done) => {
    userDataPersistance.update(mockAddress, mockBalance, mockMnemonic)
    done()
  })

  test('should get new value after update variables successful', (done) => {
    expect(userDataPersistance.userAddress).toEqual(mockAddress)
    expect(userDataPersistance.balance).toEqual(mockBalance)
    expect(userDataPersistance.mnemonic).toEqual(mockMnemonic)
    done()
  })

  test('should save variables into localStorage successful', (done) => {
    userDataPersistance.save()
    done()
  })

  test('should get variables value from localStorage after save successful', (done) => {
    // Private scope
    const _userDataPersistance = new UserDataPersistance()
    expect(_userDataPersistance.userAddress).toEqual(mockAddress)
    expect(_userDataPersistance.balance).toEqual(mockBalance)
    expect(_userDataPersistance.mnemonic).toEqual(mockMnemonic)
    done()
  })

  test('should updateUserBalance successful', (done) => {
    userDataPersistance.updateUserBalance(1000)
    done()
  })

  test('should get new balance after updateUserBalance successful', (done) => {
    // Private scope
    const _userDataPersistance = new UserDataPersistance()
    expect(_userDataPersistance.balance).toBe(1000)

    // Global scope
    expect(userDataPersistance.balance).toBe(1000)
    done()
  })
})
